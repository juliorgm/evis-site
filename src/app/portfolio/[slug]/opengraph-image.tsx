import { ImageResponse } from 'next/og';
import type { CSSProperties } from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { getCaseBySlug, getCases } from '@/lib/content';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getCases().map((caseItem) => ({ slug: caseItem.slug }));
}

function readCapaAsDataUrl(capa: string): string | null {
  const filePath = path.join(process.cwd(), 'public', capa);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const extension = path.extname(filePath).toLowerCase();
  const mime = extension === '.png' ? 'image/png' : 'image/jpeg';
  const buffer = fs.readFileSync(filePath);

  return `data:${mime};base64,${buffer.toString('base64')}`;
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  const capaDataUrl = caseItem ? readCapaAsDataUrl(caseItem.capa) : null;
  const cliente = caseItem?.cliente ?? 'Evis Produtora';
  const titulo = caseItem?.titulo ?? '';

  const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#170A00',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  };

  // satori (motor do ImageResponse) nao aceita "undefined" como valor de
  // propriedade CSS — precisa nem existir a chave quando nao ha capa.
  if (capaDataUrl) {
    containerStyle.backgroundImage = `url(${capaDataUrl})`;
  }

  return new ImageResponse(
    (
      <div style={containerStyle}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'linear-gradient(to top, rgba(23,10,0,0.95) 10%, rgba(23,10,0,0.35) 55%, rgba(23,10,0,0.1) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: '64px 72px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#F38627',
            }}
          >
            Evis Produtora
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontWeight: 800,
              color: '#F6F2E7',
              maxWidth: 980,
              lineHeight: 1.1,
            }}
          >
            {cliente}
          </div>
          {titulo && (
            <div
              style={{
                display: 'flex',
                fontSize: 30,
                color: '#DCCDB8',
                maxWidth: 980,
              }}
            >
              {titulo}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
