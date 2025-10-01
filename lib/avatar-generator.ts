export interface AvatarOptions {
  category: 'funny' | 'cute' | 'cool' | 'anime' | 'default';
  style?: string;
  colors?: string[];
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

export interface CuteAvatarOptions {
  animal: 'cat' | 'bear' | 'bunny' | 'panda' | 'fox';
  eyes: string;
  cheeks?: boolean;
  accessories?: string[];
  backgroundColor?: string;
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
    const { ctx, canvas } = this;
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
    const { ctx, canvas } = this;

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