import * as THREE from 'three';

export function createSmartProjectTexture(project) {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  const drawSlate = () => {
    const grad = ctx.createLinearGradient(0, 0, 1280, 720);
    grad.addColorStop(0, '#1A1D23');
    grad.addColorStop(0.5, '#111317');
    grad.addColorStop(1, '#0B0C0E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1280, 720);

    ctx.strokeStyle = 'rgba(243, 241, 238, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 1280; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 720);
      ctx.stroke();
    }
    for (let y = 0; y <= 720; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1280, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#F04444';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, 1208, 648);

    ctx.fillStyle = '#F04444';
    ctx.fillRect(68, 72, 110, 6);

    ctx.font = '600 24px "JetBrains Mono", monospace';
    ctx.fillStyle = '#F04444';
    ctx.fillText(
      'PILLAR ' + project.pillarNumber + ' // ' + project.pillarTitle.toUpperCase(),
      68,
      132
    );

    ctx.font = '800 56px "Cabinet Grotesk", "Syne", sans-serif';
    ctx.fillStyle = '#F3F1EE';
    wrapText(ctx, project.title, 68, 235, 1120, 66);

    ctx.font = '500 28px "Inter Tight", sans-serif';
    ctx.fillStyle = '#A6A8AC';
    ctx.fillText(project.role + '  •  ' + project.format, 68, 425);

    ctx.fillStyle = 'rgba(240, 68, 68, 0.72)';
    for (let i = 0; i < 66; i++) {
      const barH = 14 + Math.abs(Math.sin(i * 0.42 + Number(project.pillarNumber)) * 48);
      ctx.fillRect(68 + i * 17, 545 - barH / 2, 9, barH);
    }

    ctx.font = '600 22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#F3F1EE';
    ctx.fillText('[ CLICK 3D SCREEN TO OPEN PROJECT & VIDEO ]', 68, 635);
  };

  drawSlate();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  if (project.thumbnail) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, 1280, 720);
      ctx.drawImage(img, 0, 0, 1280, 720);

      const overlay = ctx.createLinearGradient(0, 440, 0, 720);
      overlay.addColorStop(0, 'rgba(11,12,14,0)');
      overlay.addColorStop(1, 'rgba(11,12,14,0.88)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 440, 1280, 280);

      ctx.font = '600 22px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F04444';
      ctx.fillText('PILLAR ' + project.pillarNumber + ' • ' + project.format.toUpperCase(), 48, 618);

      ctx.font = '800 40px "Cabinet Grotesk", sans-serif';
      ctx.fillStyle = '#F3F1EE';
      ctx.fillText(project.title, 48, 668);

      texture.needsUpdate = true;
    };
    img.src = project.thumbnail;
  }

  return texture;
}

export function createSmartPortraitTexture(portraitPath) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  const drawFallback = () => {
    const grad = ctx.createRadialGradient(400, 400, 50, 400, 500, 620);
    grad.addColorStop(0, '#27292D');
    grad.addColorStop(1, '#0B0C0E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 1000);

    ctx.strokeStyle = '#F04444';
    ctx.lineWidth = 4;
    ctx.strokeRect(32, 32, 736, 936);

    ctx.beginPath();
    ctx.arc(400, 380, 110, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = '800 54px "Cabinet Grotesk", sans-serif';
    ctx.fillStyle = '#F3F1EE';
    ctx.fillText('UMAR MUSHTAQ', 400, 610);

    ctx.font = '500 22px "JetBrains Mono", monospace';
    ctx.fillStyle = '#F04444';
    ctx.fillText('VIDEO EDITOR & YOUTUBE STRATEGIST', 400, 660);

    ctx.font = '400 18px "JetBrains Mono", monospace';
    ctx.fillStyle = '#A6A8AC';
    ctx.fillText('Save portrait at public/assets/umar-portrait.jpg', 400, 910);
  };

  drawFallback();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  if (portraitPath) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, 800, 1000);
      ctx.fillStyle = '#0B0C0E';
      ctx.fillRect(0, 0, 800, 1000);

      const scale = Math.max(800 / img.width, 1000 / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      // Top-bias crop so chest-up portrait head is framed cleanly
      ctx.drawImage(img, (800 - w) / 2, (1000 - h) * 0.25, w, h);

      const grad = ctx.createLinearGradient(0, 720, 0, 1000);
      grad.addColorStop(0, 'rgba(11,12,14,0)');
      grad.addColorStop(1, 'rgba(11,12,14,0.92)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 720, 800, 280);

      ctx.textAlign = 'left';
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F04444';
      ctx.fillText('● STUDIO PORTRAIT // 5+ YRS EXP', 44, 898);

      ctx.font = '800 42px "Cabinet Grotesk", sans-serif';
      ctx.fillStyle = '#F3F1EE';
      ctx.fillText('UMAR MUSHTAQ', 44, 948);

      texture.needsUpdate = true;
    };
    img.src = portraitPath;
  }

  return texture;
}

export function createDetailBadgeTexture(text, index) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 110;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#14171C';
  ctx.fillRect(0, 0, 512, 110);

  ctx.strokeStyle = '#F04444';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 504, 102);

  ctx.fillStyle = '#F04444';
  ctx.fillRect(20, 32, 8, 46);

  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillStyle = '#F04444';
  ctx.fillText('0' + (index + 1), 42, 46);

  ctx.font = '700 24px "Cabinet Grotesk", "Inter Tight", sans-serif';
  ctx.fillStyle = '#F3F1EE';
  ctx.fillText(text, 42, 78);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
