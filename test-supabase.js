const url = "https://ggiiabscngwlqrqdaufd.supabase.co/rest/v1/produtos";
const key = "sb_publishable_mzsBserUpdNdOl9u1g-ruw_2roY_UXE";

const testProduct = {
  id: 9999,
  nome: "Teste Conexao",
  categoria: "Tênis",
  genero: "Unissex",
  preco: 100.00,
  precoOld: null,
  tag: null,
  tagLabel: null,
  destaque: false,
  promo: false,
  desc: "Teste",
  tamanhos: ["39"],
  cores: ["Preto"],
  material: "Teste",
  garantia: "Teste",
  peso: "Teste",
  imgs: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"],
  sales: 0
};

async function test() {
  console.log("Enviando requisição POST para o Supabase...");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(testProduct)
    });

    console.log("Status da resposta:", res.status, res.statusText);
    const body = await res.text();
    console.log("Corpo da resposta:", body);

    if (res.status === 201 || res.status === 200) {
      console.log("Sucesso! O produto de teste foi inserido.");
      // Limpar o produto de teste
      console.log("Deletando o produto de teste...");
      const delRes = await fetch(`${url}?id=eq.9999`, {
        method: "DELETE",
        headers: {
          "apikey": key,
          "Authorization": `Bearer ${key}`
        }
      });
      console.log("Status do DELETE:", delRes.status);
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
  }
}

test();
