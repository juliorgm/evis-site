export type JsonLdProps = {
  data: object;
};

// Serializa com segurança para dentro de um <script>: escapa "<" para evitar
// que o parser HTML interprete "</script>" dentro da string JSON.
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
