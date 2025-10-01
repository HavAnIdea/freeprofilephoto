export interface AvatarOptions {
  category: 'funny' | 'cute' | 'cool' | 'anime' | 'default';
  style?: string;
  colors?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements?: Record<string, any>;
  size?: number;
}

export interface FunnyAvatarOptions {
  face: string;
  accessories?: string[];
  background?: string;
  text?: string;
  textColor?: string;
  backgroundColor?: string;
}

export interface PhotoEditOptions {
  image: HTMLImageElement | string; // Base64 or Image element
  crop?: {
    x: number;
    y: number;
    width: number;
    height: number;
    shape?: 'circle' | 'square';
  };
  stickers?: Array<{
    emoji: string;
    x: number;
    y: number;
    size: number;
    rotation?: number;
  }>;
  text?: string;
  textColor?: string;
  textPosition?: 'top' | 'bottom';
  background?: string;
  backgroundColor?: string;
  filter?: 'none' | 'grayscale' | 'sepia' | 'vintage' | 'blue' | 'warm';
}

export interface CuteAvatarOptions {
  animal: 'cat' | 'bear' | 'bunny' | 'panda' | 'fox';
  eyes: string;
  cheeks?: boolean;
  accessories?: string[];
  backgroundColor?: string;
}

export interface CoolAvatarOptions {
  colorScheme: string[];
  shape: 'circle' | 'square' | 'hexagon' | 'triangle';
  pattern?: 'none' | 'dots' | 'grid' | 'waves' | 'geometric';
  gradientType: 'linear' | 'radial' | 'conic';
  glow?: boolean;
  text?: string;
  textColor?: string;
}

export interface AnimeAvatarOptions {
  hairStyle: 'short' | 'long' | 'twintails' | 'ponytail' | 'bob';
  hairColor: string;
  eyeStyle: 'sparkle' | 'normal' | 'closed' | 'happy';
  expression: 'smile' | 'neutral' | 'shy' | 'wink';
  accessories?: string[];
  backgroundColor?: string;
  backgroundEffect?: 'stars' | 'sparkles' | 'gradient' | 'none';
}


export class AvatarGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(size: number = 400) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size;
    this.ctx = this.canvas.getContext('2d')!;
  }

  generateFunny(options: FunnyAvatarOptions): string {
    const { canvas, ctx } = this;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    this.drawFunnyBackground(options.background || 'gradient-1', options.backgroundColor);

    // Draw emoji face
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.font = '180px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    ctx.fillText(options.face, centerX, centerY - 20);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw accessories
    if (options.accessories && options.accessories.length > 0) {
      this.drawAccessories(options.accessories);
    }

    // Draw text if provided
    if (options.text) {
      this.drawText(options.text, options.textColor || '#ffffff');
    }

    return canvas.toDataURL('image/png');
  }

  async generatePhotoWithStickers(options: PhotoEditOptions): Promise<string> {
    const { canvas, ctx } = this;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    if (options.background || options.backgroundColor) {
      this.drawFunnyBackground(options.background || 'solid', options.backgroundColor || '#ffffff');
    }

    // Load and draw image
    let img: HTMLImageElement;
    if (typeof options.image === 'string') {
      img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = options.image as string;
      });
    } else {
      img = options.image as HTMLImageElement;
    }

    // Apply crop if specified
    if (options.crop) {
      const { x, y, width, height, shape } = options.crop;

      ctx.save();

      if (shape === 'circle') {
        // Create circular clipping path
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.clip();
      }

      // Draw cropped image
      const scale = Math.max(canvas.width / width, canvas.height / height);
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;
      const offsetX = (canvas.width - scaledWidth) / 2;
      const offsetY = (canvas.height - scaledHeight) / 2;

      ctx.drawImage(img, x, y, width, height, offsetX, offsetY, scaledWidth, scaledHeight);
      ctx.restore();
    } else {
      // Draw full image
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const offsetX = (canvas.width - scaledWidth) / 2;
      const offsetY = (canvas.height - scaledHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
    }

    // Apply filter
    if (options.filter && options.filter !== 'none') {
      this.applyFilter(options.filter);
    }

    // Draw stickers
    if (options.stickers && options.stickers.length > 0) {
      for (const sticker of options.stickers) {
        ctx.save();

        // Position and rotate
        ctx.translate(sticker.x, sticker.y);
        if (sticker.rotation) {
          ctx.rotate((sticker.rotation * Math.PI) / 180);
        }

        // Draw emoji sticker
        ctx.font = `${sticker.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Add shadow for sticker
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(sticker.emoji, 0, 0);

        ctx.restore();
      }
    }

    // Draw text
    if (options.text) {
      const position = options.textPosition || 'bottom';
      const textY = position === 'top' ? 60 : canvas.height - 40;

      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = options.textColor || '#ffffff';

      // Add text background
      const textWidth = ctx.measureText(options.text).width;
      const padding = 20;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(
        (canvas.width - textWidth) / 2 - padding,
        textY - 25,
        textWidth + padding * 2,
        40
      );

      ctx.fillStyle = options.textColor || '#ffffff';
      ctx.fillText(options.text, canvas.width / 2, textY);
    }

    return canvas.toDataURL('image/png');
  }

  private applyFilter(filter: string) {
    const { ctx, canvas } = this;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch(filter) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        }
        break;

      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        }
        break;

      case 'vintage':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.2);
          data[i + 1] = Math.min(255, data[i + 1] * 1.1);
          data[i + 2] = Math.min(255, data[i + 2] * 0.9);
        }
        break;

      case 'blue':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 0.8);
          data[i + 1] = Math.min(255, data[i + 1] * 0.9);
          data[i + 2] = Math.min(255, data[i + 2] * 1.3);
        }
        break;

      case 'warm':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.3);
          data[i + 1] = Math.min(255, data[i + 1] * 1.1);
          data[i + 2] = Math.min(255, data[i + 2] * 0.8);
        }
        break;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // Helper function to fix image orientation based on EXIF data
  async fixImageOrientation(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const dataView = new DataView(arrayBuffer);

        // Check for EXIF orientation
        let orientation = 1;
        if (dataView.getUint16(0, false) === 0xFFD8) {
          let offset = 2;
          while (offset < dataView.byteLength) {
            if (dataView.getUint16(offset, false) === 0xFFE1) {
              // Found EXIF marker
              const exifOffset = offset + 10;
              if (dataView.getUint32(exifOffset, false) === 0x45786966) {
                // Found EXIF header
                const tiffOffset = exifOffset + 6;
                const littleEndian = dataView.getUint16(tiffOffset, false) === 0x4949;
                const ifdOffset = dataView.getUint32(tiffOffset + 4, littleEndian) + tiffOffset;
                const tags = dataView.getUint16(ifdOffset, littleEndian);

                for (let i = 0; i < tags; i++) {
                  const tagOffset = ifdOffset + 2 + (i * 12);
                  if (dataView.getUint16(tagOffset, littleEndian) === 0x0112) {
                    orientation = dataView.getUint16(tagOffset + 8, littleEndian);
                    break;
                  }
                }
              }
              break;
            }
            offset += 2;
          }
        }

        // Create image and rotate based on orientation
        const img = new Image();
        img.onload = () => {
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d')!;

          if (orientation > 4) {
            tempCanvas.width = img.height;
            tempCanvas.height = img.width;
          } else {
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
          }

          switch (orientation) {
            case 2:
              tempCtx.transform(-1, 0, 0, 1, img.width, 0);
              break;
            case 3:
              tempCtx.transform(-1, 0, 0, -1, img.width, img.height);
              break;
            case 4:
              tempCtx.transform(1, 0, 0, -1, 0, img.height);
              break;
            case 5:
              tempCtx.transform(0, 1, 1, 0, 0, 0);
              break;
            case 6:
              tempCtx.transform(0, 1, -1, 0, img.height, 0);
              break;
            case 7:
              tempCtx.transform(0, -1, -1, 0, img.height, img.width);
              break;
            case 8:
              tempCtx.transform(0, -1, 1, 0, 0, img.width);
              break;
          }

          tempCtx.drawImage(img, 0, 0);
          resolve(tempCanvas.toDataURL('image/jpeg', 0.92));
        };

        img.src = URL.createObjectURL(file);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  generateCute(options: CuteAvatarOptions): string {
    const { canvas, ctx } = this;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    this.drawCuteBackground(options.backgroundColor || '#ffebf0');

    // Draw animal
    this.drawCuteAnimal(options.animal, options.eyes, options.cheeks);

    // Draw accessories
    if (options.accessories && options.accessories.length > 0) {
      this.drawCuteAccessories(options.accessories);
    }

    return canvas.toDataURL('image/png');
  }

  generateCool(options: CoolAvatarOptions): string {
    const { canvas, ctx } = this;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background
    this.drawCoolGradient(options.colorScheme, options.gradientType);

    // Draw pattern overlay if specified
    if (options.pattern && options.pattern !== 'none') {
      this.drawCoolPattern(options.pattern);
    }

    // Draw main shape
    this.drawCoolShape(options.shape, options.colorScheme, options.glow);

    // Draw text if provided
    if (options.text) {
      this.drawCoolText(options.text, options.textColor || '#ffffff');
    }

    return canvas.toDataURL('image/png');
  }

  generateAnime(options: AnimeAvatarOptions): string {
    const { canvas, ctx } = this;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    this.drawAnimeBackground(options.backgroundColor || '#fff5f7', options.backgroundEffect || 'none');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw face
    this.drawAnimeFace(centerX, centerY);

    // Draw hair
    this.drawAnimeHair(centerX, centerY, options.hairStyle, options.hairColor);

    // Draw eyes
    this.drawAnimeEyes(centerX, centerY, options.eyeStyle, options.expression);

    // Draw mouth
    this.drawAnimeMouth(centerX, centerY, options.expression);

    // Draw accessories
    if (options.accessories && options.accessories.length > 0) {
      this.drawAnimeAccessories(centerX, centerY, options.accessories);
    }

    return canvas.toDataURL('image/png');
  }

  private drawFunnyBackground(style: string, color?: string) {
    const { ctx, canvas } = this;

    switch(style) {
      case 'gradient-1':
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;

      case 'gradient-2':
        const gradient2 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient2.addColorStop(0, '#f093fb');
        gradient2.addColorStop(1, '#f5576c');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;

      case 'gradient-3':
        const gradient3 = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        gradient3.addColorStop(0, '#4facfe');
        gradient3.addColorStop(1, '#00f2fe');
        ctx.fillStyle = gradient3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;

      case 'rainbow':
        const rainbow = ctx.createLinearGradient(0, 0, canvas.width, 0);
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
        colors.forEach((color, i) => {
          rainbow.addColorStop(i / (colors.length - 1), color);
        });
        ctx.fillStyle = rainbow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;

      case 'dots':
        ctx.fillStyle = color || '#ffd93d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let x = 0; x < canvas.width; x += 30) {
          for (let y = 0; y < canvas.height; y += 30) {
            ctx.beginPath();
            ctx.arc(x + 15, y + 15, 8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'solid':
      default:
        ctx.fillStyle = color || '#6366f1';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;
    }
  }

  private drawAccessories(accessories: string[]) {
    const { ctx, canvas } = this;
    ctx.font = '60px Arial';

    // Position accessories around the main emoji
    const positions = [
      { x: canvas.width * 0.2, y: canvas.height * 0.2 },
      { x: canvas.width * 0.8, y: canvas.height * 0.2 },
      { x: canvas.width * 0.2, y: canvas.height * 0.8 },
      { x: canvas.width * 0.8, y: canvas.height * 0.8 },
    ];

    accessories.forEach((accessory, index) => {
      if (index < positions.length) {
        const pos = positions[index];
        ctx.fillText(accessory, pos.x, pos.y);
      }
    });
  }

  private drawText(text: string, color: string) {
    const { ctx, canvas } = this;

    // Draw text at bottom
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;

    // Add text background
    const textWidth = ctx.measureText(text).width;
    const padding = 20;
    const textY = canvas.height - 40;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(
      (canvas.width - textWidth) / 2 - padding,
      textY - 25,
      textWidth + padding * 2,
      40
    );

    ctx.fillStyle = color;
    ctx.fillText(text, canvas.width / 2, textY);
  }

  private drawCuteBackground(color: string) {
    const { ctx, canvas } = this;

    // Soft gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, this.adjustBrightness(color, -20));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add sparkles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawCuteAnimal(animal: string, eyes: string, cheeks?: boolean) {
    const { canvas } = this;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    switch(animal) {
      case 'cat':
        this.drawCat(centerX, centerY, eyes, cheeks);
        break;
      case 'bear':
        this.drawBear(centerX, centerY, eyes, cheeks);
        break;
      case 'bunny':
        this.drawBunny(centerX, centerY, eyes, cheeks);
        break;
      case 'panda':
        this.drawPanda(centerX, centerY, eyes, cheeks);
        break;
      case 'fox':
        this.drawFox(centerX, centerY, eyes, cheeks);
        break;
    }
  }

  private drawCat(x: number, y: number, eyes: string, cheeks?: boolean) {
    const { ctx } = this;

    // Head
    ctx.fillStyle = '#ffcc99';
    ctx.beginPath();
    ctx.arc(x, y, 80, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.fillStyle = '#ffcc99';
    ctx.beginPath();
    ctx.moveTo(x - 60, y - 60);
    ctx.lineTo(x - 80, y - 100);
    ctx.lineTo(x - 40, y - 80);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 60, y - 60);
    ctx.lineTo(x + 80, y - 100);
    ctx.lineTo(x + 40, y - 80);
    ctx.fill();

    // Inner ears
    ctx.fillStyle = '#ff9999';
    ctx.beginPath();
    ctx.moveTo(x - 55, y - 70);
    ctx.lineTo(x - 65, y - 85);
    ctx.lineTo(x - 45, y - 75);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 55, y - 70);
    ctx.lineTo(x + 65, y - 85);
    ctx.lineTo(x + 45, y - 75);
    ctx.fill();

    // Eyes
    this.drawCuteEyes(x, y, eyes);

    // Nose
    ctx.fillStyle = '#ff6b9d';
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x - 8, y + 20);
    ctx.lineTo(x + 8, y + 20);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.quadraticCurveTo(x - 15, y + 30, x - 20, y + 25);
    ctx.moveTo(x, y + 20);
    ctx.quadraticCurveTo(x + 15, y + 30, x + 20, y + 25);
    ctx.stroke();

    // Whiskers
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 80, y + 10);
    ctx.lineTo(x - 40, y + 5);
    ctx.moveTo(x - 80, y + 20);
    ctx.lineTo(x - 40, y + 15);
    ctx.moveTo(x + 40, y + 5);
    ctx.lineTo(x + 80, y + 10);
    ctx.moveTo(x + 40, y + 15);
    ctx.lineTo(x + 80, y + 20);
    ctx.stroke();

    // Cheeks
    if (cheeks) {
      ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
      ctx.beginPath();
      ctx.arc(x - 50, y + 20, 15, 0, Math.PI * 2);
      ctx.arc(x + 50, y + 20, 15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawBear(x: number, y: number, eyes: string, cheeks?: boolean) {
    const { ctx } = this;

    // Ears
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(x - 50, y - 50, 25, 0, Math.PI * 2);
    ctx.arc(x + 50, y - 50, 25, 0, Math.PI * 2);
    ctx.fill();

    // Inner ears
    ctx.fillStyle = '#d2691e';
    ctx.beginPath();
    ctx.arc(x - 50, y - 50, 12, 0, Math.PI * 2);
    ctx.arc(x + 50, y - 50, 12, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.fillStyle = '#d2691e';
    ctx.beginPath();
    ctx.ellipse(x, y + 20, 35, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    this.drawCuteEyes(x, y - 10, eyes);

    // Nose
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(x, y + 15, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.quadraticCurveTo(x - 10, y + 30, x - 15, y + 25);
    ctx.moveTo(x, y + 20);
    ctx.quadraticCurveTo(x + 10, y + 30, x + 15, y + 25);
    ctx.stroke();

    // Cheeks
    if (cheeks) {
      ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
      ctx.beginPath();
      ctx.arc(x - 40, y + 10, 12, 0, Math.PI * 2);
      ctx.arc(x + 40, y + 10, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawBunny(x: number, y: number, eyes: string, cheeks?: boolean) {
    const { ctx } = this;

    // Ears
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.ellipse(x - 25, y - 60, 15, 40, -0.2, 0, Math.PI * 2);
    ctx.ellipse(x + 25, y - 60, 15, 40, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Inner ears
    ctx.fillStyle = '#ffb6c1';
    ctx.beginPath();
    ctx.ellipse(x - 25, y - 60, 8, 25, -0.2, 0, Math.PI * 2);
    ctx.ellipse(x + 25, y - 60, 8, 25, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.arc(x, y, 65, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    this.drawCuteEyes(x, y - 10, eyes);

    // Nose
    ctx.fillStyle = '#ff69b4';
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x - 6, y + 18);
    ctx.lineTo(x + 6, y + 18);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 18);
    ctx.quadraticCurveTo(x - 10, y + 25, x - 12, y + 20);
    ctx.moveTo(x, y + 18);
    ctx.quadraticCurveTo(x + 10, y + 25, x + 12, y + 20);
    ctx.stroke();

    // Teeth
    ctx.fillStyle = '#fff';
    ctx.fillRect(x - 6, y + 20, 5, 8);
    ctx.fillRect(x + 1, y + 20, 5, 8);

    // Cheeks
    if (cheeks) {
      ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
      ctx.beginPath();
      ctx.arc(x - 35, y + 5, 12, 0, Math.PI * 2);
      ctx.arc(x + 35, y + 5, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawPanda(x: number, y: number, eyes: string, cheeks?: boolean) {
    const { ctx } = this;

    // Ears
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x - 50, y - 50, 25, 0, Math.PI * 2);
    ctx.arc(x + 50, y - 50, 25, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, Math.PI * 2);
    ctx.fill();

    // Eye patches
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(x - 25, y - 5, 20, 25, -0.3, 0, Math.PI * 2);
    ctx.ellipse(x + 25, y - 5, 20, 25, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    this.drawCuteEyes(x, y - 5, eyes, '#fff');

    // Nose
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(x, y + 15, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.quadraticCurveTo(x - 10, y + 28, x - 12, y + 23);
    ctx.moveTo(x, y + 20);
    ctx.quadraticCurveTo(x + 10, y + 28, x + 12, y + 23);
    ctx.stroke();

    // Cheeks
    if (cheeks) {
      ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
      ctx.beginPath();
      ctx.arc(x - 45, y + 15, 12, 0, Math.PI * 2);
      ctx.arc(x + 45, y + 15, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawFox(x: number, y: number, eyes: string, cheeks?: boolean) {
    const { ctx } = this;

    // Ears
    ctx.fillStyle = '#ff6b35';
    ctx.beginPath();
    ctx.moveTo(x - 60, y - 40);
    ctx.lineTo(x - 75, y - 80);
    ctx.lineTo(x - 35, y - 60);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 60, y - 40);
    ctx.lineTo(x + 75, y - 80);
    ctx.lineTo(x + 35, y - 60);
    ctx.fill();

    // Inner ears
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(x - 55, y - 50);
    ctx.lineTo(x - 62, y - 65);
    ctx.lineTo(x - 45, y - 55);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 55, y - 50);
    ctx.lineTo(x + 62, y - 65);
    ctx.lineTo(x + 45, y - 55);
    ctx.fill();

    // Head
    ctx.fillStyle = '#ff6b35';
    ctx.beginPath();
    ctx.arc(x, y, 70, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(x, y + 20, 35, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    this.drawCuteEyes(x, y - 10, eyes);

    // Nose
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(x, y + 15, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 19);
    ctx.quadraticCurveTo(x - 12, y + 28, x - 15, y + 23);
    ctx.moveTo(x, y + 19);
    ctx.quadraticCurveTo(x + 12, y + 28, x + 15, y + 23);
    ctx.stroke();

    // Cheeks
    if (cheeks) {
      ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
      ctx.beginPath();
      ctx.arc(x - 45, y + 10, 12, 0, Math.PI * 2);
      ctx.arc(x + 45, y + 10, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawCuteEyes(x: number, y: number, style: string, color: string = '#000') {
    const { ctx } = this;

    switch(style) {
      case 'sparkle':
        // Large sparkly eyes
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x - 25, y, 12, 0, Math.PI * 2);
        ctx.arc(x + 25, y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Sparkles
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x - 22, y - 3, 4, 0, Math.PI * 2);
        ctx.arc(x + 28, y - 3, 4, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'closed':
        // Happy closed eyes ^_^
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x - 25, y, 10, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.arc(x + 25, y, 10, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        break;

      case 'round':
        // Simple round eyes
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x - 25, y, 8, 0, Math.PI * 2);
        ctx.arc(x + 25, y, 8, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'kawaii':
      default:
        // >< eyes
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - 30, y - 5);
        ctx.lineTo(x - 20, y + 5);
        ctx.moveTo(x - 20, y - 5);
        ctx.lineTo(x - 30, y + 5);
        ctx.moveTo(x + 20, y - 5);
        ctx.lineTo(x + 30, y + 5);
        ctx.moveTo(x + 30, y - 5);
        ctx.lineTo(x + 20, y + 5);
        ctx.stroke();
        break;
    }
  }

  private drawCuteAccessories(accessories: string[]) {
    const { canvas } = this;

    accessories.forEach(accessory => {
      switch(accessory) {
        case 'bow':
          this.drawBow(canvas.width / 2, canvas.height * 0.15);
          break;
        case 'flower':
          this.drawFlower(canvas.width * 0.7, canvas.height * 0.2);
          break;
        case 'hearts':
          this.drawHearts();
          break;
        case 'stars':
          this.drawStars();
          break;
      }
    });
  }

  private drawBow(x: number, y: number) {
    const { ctx } = this;

    ctx.fillStyle = '#ff69b4';

    // Left loop
    ctx.beginPath();
    ctx.moveTo(x - 20, y);
    ctx.quadraticCurveTo(x - 35, y - 10, x - 35, y);
    ctx.quadraticCurveTo(x - 35, y + 10, x - 20, y);
    ctx.fill();

    // Right loop
    ctx.beginPath();
    ctx.moveTo(x + 20, y);
    ctx.quadraticCurveTo(x + 35, y - 10, x + 35, y);
    ctx.quadraticCurveTo(x + 35, y + 10, x + 20, y);
    ctx.fill();

    // Center
    ctx.fillRect(x - 8, y - 5, 16, 10);
  }

  private drawFlower(x: number, y: number) {
    const { ctx } = this;

    // Petals
    ctx.fillStyle = '#ff69b4';
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const petalX = x + Math.cos(angle) * 12;
      const petalY = y + Math.sin(angle) * 12;
      ctx.beginPath();
      ctx.arc(petalX, petalY, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Center
    ctx.fillStyle = '#ffeb3b';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawHearts() {
    const { ctx, canvas } = this;
    ctx.fillStyle = 'rgba(255, 105, 180, 0.6)';

    const positions = [
      { x: canvas.width * 0.15, y: canvas.height * 0.15 },
      { x: canvas.width * 0.85, y: canvas.height * 0.15 },
      { x: canvas.width * 0.15, y: canvas.height * 0.85 },
      { x: canvas.width * 0.85, y: canvas.height * 0.85 },
    ];

    positions.forEach(pos => {
      this.drawHeart(pos.x, pos.y, 15);
    });
  }

  private drawHeart(x: number, y: number, size: number) {
    const { ctx } = this;

    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x - size / 2, y - size / 2, x - size / 4, y - size / 4);
    ctx.arc(x - size / 4, y - size / 3, size / 4, Math.PI, 0, false);
    ctx.arc(x + size / 4, y - size / 3, size / 4, Math.PI, 0, false);
    ctx.quadraticCurveTo(x + size / 2, y - size / 2, x, y + size / 4);
    ctx.fill();
  }

  private drawStars() {
    const { ctx, canvas } = this;
    ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';

    for (let i = 0; i < 8; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      this.drawStar(x, y, 5, 10, 5);
    }
  }

  private drawStar(x: number, y: number, radius1: number, radius2: number, npoints: number) {
    const { ctx } = this;

    ctx.beginPath();
    for (let i = 0; i < npoints * 2; i++) {
      const radius = i % 2 === 0 ? radius2 : radius1;
      const angle = (i * Math.PI) / npoints - Math.PI / 2;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
  }

  private adjustBrightness(color: string, amount: number): string {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;

    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;

    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  }

  private drawCoolGradient(colors: string[], type: 'linear' | 'radial' | 'conic') {
    const { ctx, canvas } = this;
    let gradient: CanvasGradient;

    switch(type) {
      case 'linear':
        gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        break;
      case 'radial':
        gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        break;
      case 'conic':
        gradient = ctx.createConicGradient(0, canvas.width / 2, canvas.height / 2);
        break;
    }

    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1), color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private drawCoolPattern(pattern: string) {
    const { ctx, canvas } = this;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;

    switch(pattern) {
      case 'dots':
        for (let x = 0; x < canvas.width; x += 30) {
          for (let y = 0; y < canvas.height; y += 30) {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'grid':
        for (let x = 0; x < canvas.width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        break;

      case 'waves':
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 50) {
          ctx.moveTo(0, y);
          for (let x = 0; x < canvas.width; x += 10) {
            ctx.lineTo(x, y + Math.sin(x / 30) * 10);
          }
        }
        ctx.stroke();
        break;

      case 'geometric':
        for (let x = 0; x < canvas.width; x += 60) {
          for (let y = 0; y < canvas.height; y += 60) {
            ctx.save();
            ctx.translate(x + 30, y + 30);
            ctx.rotate(Math.PI / 4);
            ctx.strokeRect(-15, -15, 30, 30);
            ctx.restore();
          }
        }
        break;
    }
  }

  private drawCoolShape(shape: string, colors: string[], glow?: boolean) {
    const { ctx, canvas } = this;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = Math.min(canvas.width, canvas.height) * 0.5;

    // Apply glow effect
    if (glow) {
      ctx.shadowColor = colors[0];
      ctx.shadowBlur = 40;
    }

    // Create gradient for shape
    const gradient = ctx.createLinearGradient(
      centerX - size / 2, centerY - size / 2,
      centerX + size / 2, centerY + size / 2
    );
    colors.forEach((color, i) => {
      gradient.addColorStop(i / (colors.length - 1), color);
    });
    ctx.fillStyle = gradient;

    switch(shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'square':
        ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size);
        break;

      case 'hexagon':
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + (size / 2) * Math.cos(angle);
          const y = centerY + (size / 2) * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;

      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size / 2);
        ctx.lineTo(centerX - size / 2, centerY + size / 2);
        ctx.lineTo(centerX + size / 2, centerY + size / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  private drawCoolText(text: string, color: string) {
    const { ctx, canvas } = this;

    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText(text, canvas.width / 2, canvas.height - 50);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  private drawAnimeBackground(color: string, effect: string) {
    const { ctx, canvas } = this;

    // Base gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, this.adjustBrightness(color, -30));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add effect
    switch(effect) {
      case 'stars':
        this.drawStars();
        break;
      case 'sparkles':
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 3 + 1;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      case 'gradient':
        const overlay = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        overlay.addColorStop(0, 'rgba(255, 182, 193, 0.3)');
        overlay.addColorStop(1, 'rgba(173, 216, 230, 0.3)');
        ctx.fillStyle = overlay;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;
    }
  }

  private drawAnimeFace(x: number, y: number) {
    const { ctx } = this;

    // Face (soft peach color)
    ctx.fillStyle = '#ffe0bd';
    ctx.beginPath();
    ctx.arc(x, y, 80, 0, Math.PI * 2);
    ctx.fill();

    // Chin shadow for depth
    ctx.fillStyle = 'rgba(255, 200, 170, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x, y + 60, 50, 25, 0, 0, Math.PI);
    ctx.fill();
  }

  private drawAnimeHair(x: number, y: number, style: string, color: string) {
    const { ctx } = this;
    ctx.fillStyle = color;

    switch(style) {
      case 'short':
        // Short spiky hair
        ctx.beginPath();
        ctx.arc(x, y - 20, 90, Math.PI, 0, true);
        ctx.fill();

        // Bangs
        for (let i = 0; i < 5; i++) {
          const offsetX = (i - 2) * 20;
          ctx.beginPath();
          ctx.moveTo(x + offsetX, y - 60);
          ctx.lineTo(x + offsetX - 10, y - 30);
          ctx.lineTo(x + offsetX + 10, y - 30);
          ctx.closePath();
          ctx.fill();
        }
        break;

      case 'long':
        // Long flowing hair
        ctx.beginPath();
        ctx.arc(x, y - 20, 90, Math.PI, 0, true);
        ctx.fill();

        // Side hair
        ctx.beginPath();
        ctx.ellipse(x - 70, y + 20, 25, 80, 0.3, 0, Math.PI * 2);
        ctx.ellipse(x + 70, y + 20, 25, 80, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Bangs
        ctx.beginPath();
        ctx.ellipse(x, y - 50, 60, 40, 0, 0, Math.PI);
        ctx.fill();
        break;

      case 'twintails':
        // Top hair
        ctx.beginPath();
        ctx.arc(x, y - 20, 85, Math.PI, 0, true);
        ctx.fill();

        // Twin tails
        ctx.beginPath();
        ctx.ellipse(x - 80, y - 40, 30, 60, 0.5, 0, Math.PI * 2);
        ctx.ellipse(x + 80, y - 40, 30, 60, -0.5, 0, Math.PI * 2);
        ctx.fill();

        // Hair ties
        ctx.fillStyle = '#ff69b4';
        ctx.beginPath();
        ctx.arc(x - 70, y - 50, 8, 0, Math.PI * 2);
        ctx.arc(x + 70, y - 50, 8, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'ponytail':
        // Front hair
        ctx.beginPath();
        ctx.arc(x, y - 20, 90, Math.PI, 0, true);
        ctx.fill();

        // Ponytail
        ctx.beginPath();
        ctx.ellipse(x, y - 80, 40, 70, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hair tie
        ctx.fillStyle = '#ff69b4';
        ctx.beginPath();
        ctx.arc(x, y - 60, 10, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'bob':
        // Bob cut
        ctx.beginPath();
        ctx.arc(x, y - 20, 90, Math.PI, 0, true);
        ctx.fill();

        // Side bob
        ctx.beginPath();
        ctx.ellipse(x - 70, y + 10, 30, 50, 0.2, 0, Math.PI * 2);
        ctx.ellipse(x + 70, y + 10, 30, 50, -0.2, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
  }

  private drawAnimeEyes(x: number, y: number, style: string, expression: string) {
    const { ctx } = this;
    const leftEyeX = x - 25;
    const rightEyeX = x + 25;
    const eyeY = y - 10;

    switch(style) {
      case 'sparkle':
        // Large sparkly eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(leftEyeX, eyeY, 15, 0, Math.PI * 2);
        ctx.arc(rightEyeX, eyeY, 15, 0, Math.PI * 2);
        ctx.fill();

        // White highlights
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(leftEyeX - 5, eyeY - 5, 6, 0, Math.PI * 2);
        ctx.arc(rightEyeX - 5, eyeY - 5, 6, 0, Math.PI * 2);
        ctx.arc(leftEyeX + 4, eyeY + 4, 3, 0, Math.PI * 2);
        ctx.arc(rightEyeX + 4, eyeY + 4, 3, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'normal':
        // Normal anime eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(leftEyeX, eyeY, 12, 0, Math.PI * 2);
        ctx.arc(rightEyeX, eyeY, 12, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(leftEyeX - 4, eyeY - 4, 4, 0, Math.PI * 2);
        ctx.arc(rightEyeX - 4, eyeY - 4, 4, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'closed':
        // Closed eyes (happy lines)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(leftEyeX, eyeY, 12, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.arc(rightEyeX, eyeY, 12, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        break;

      case 'happy':
        // Happy closed eyes (^_^)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(leftEyeX - 15, eyeY);
        ctx.lineTo(leftEyeX, eyeY - 8);
        ctx.lineTo(leftEyeX + 15, eyeY);
        ctx.moveTo(rightEyeX - 15, eyeY);
        ctx.lineTo(rightEyeX, eyeY - 8);
        ctx.lineTo(rightEyeX + 15, eyeY);
        ctx.stroke();
        break;
    }

    // Wink effect
    if (expression === 'wink' && style !== 'closed' && style !== 'happy') {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(rightEyeX, eyeY, 12, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();
    }
  }

  private drawAnimeMouth(x: number, y: number, expression: string) {
    const { ctx } = this;
    const mouthY = y + 25;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#ff8080';

    switch(expression) {
      case 'smile':
        // Big smile
        ctx.beginPath();
        ctx.arc(x, mouthY, 20, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();
        break;

      case 'neutral':
        // Small neutral mouth
        ctx.beginPath();
        ctx.arc(x, mouthY, 10, 0, Math.PI);
        ctx.stroke();
        break;

      case 'shy':
        // Small shy smile
        ctx.beginPath();
        ctx.arc(x, mouthY, 15, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        // Blush marks
        ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
        ctx.beginPath();
        ctx.arc(x - 50, mouthY - 5, 12, 0, Math.PI * 2);
        ctx.arc(x + 50, mouthY - 5, 12, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'wink':
        // Playful smile
        ctx.beginPath();
        ctx.arc(x, mouthY, 18, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.stroke();
        break;
    }
  }

  private drawAnimeAccessories(x: number, y: number, accessories: string[]) {
    const { ctx } = this;

    accessories.forEach(accessory => {
      switch(accessory) {
        case 'glasses':
          // Glasses
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 3;
          ctx.fillStyle = 'rgba(200, 230, 255, 0.3)';

          // Left lens
          ctx.beginPath();
          ctx.arc(x - 25, y - 10, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Right lens
          ctx.beginPath();
          ctx.arc(x + 25, y - 10, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Bridge
          ctx.beginPath();
          ctx.moveTo(x - 7, y - 10);
          ctx.lineTo(x + 7, y - 10);
          ctx.stroke();
          break;

        case 'bow':
          // Hair bow
          ctx.fillStyle = '#ff69b4';
          ctx.beginPath();
          // Left loop
          ctx.arc(x - 15, y - 80, 12, 0, Math.PI * 2);
          // Right loop
          ctx.arc(x + 15, y - 80, 12, 0, Math.PI * 2);
          ctx.fill();

          // Center
          ctx.fillRect(x - 5, y - 85, 10, 10);
          break;

        case 'headband':
          // Headband
          ctx.strokeStyle = '#ff1493';
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.arc(x, y - 20, 85, Math.PI + 0.3, -0.3);
          ctx.stroke();
          break;

        case 'earring':
          // Earrings
          ctx.fillStyle = '#ffd700';
          ctx.beginPath();
          ctx.arc(x - 70, y + 10, 6, 0, Math.PI * 2);
          ctx.arc(x + 70, y + 10, 6, 0, Math.PI * 2);
          ctx.fill();

          // Shine
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(x - 68, y + 8, 2, 0, Math.PI * 2);
          ctx.arc(x + 72, y + 8, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
    });
  }

  exportAsBlob(format: 'png' | 'jpeg' = 'png', quality: number = 0.92): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        `image/${format}`,
        quality
      );
    });
  }

  downloadImage(filename: string = 'avatar.png') {
    const link = document.createElement('a');
    link.download = filename;
    link.href = this.canvas.toDataURL();
    link.click();
  }
}