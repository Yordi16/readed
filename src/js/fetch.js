function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const containerArticleBig = document.getElementById("container-artikel-big");

  fetch(
    "https://redmin.test/api/article/cara-membuat-animasi-menggunakna-clip-studio-paint-54059"
  )
    .then((response) => response.json())
    .then((article) => {
      const cardBig = document.createElement("a");
      cardBig.href = `article.html?slug=${article.slug}`;
      cardBig.className = "xl:w-2/3";
      cardBig.innerHTML = `
        <img
          src="https://redmin.test/${article.image_url}"
          alt="${article.article_name}"
          class="aspect-video object-cover border-2 border-black w-full"
        />
        <span class="bg-black text-white py-1 px-3 capitalize text-[10px] my-2.5 inline-block">
          ${article.article_type || "Apakaden"}
        </span>
        <h1 class="text-3xl font-semibold font-inter capitalize">
          ${article.article_name}
        </h1>
        <span class="text-xs flex items-center gap-1 mt-2">
          <img class="size-4" src="../../public/icons/time.svg" />
          ${new Date(article.created_at).toLocaleDateString()}
        </span>
      `;

      // ⬅️ Tambahkan ke DOM
      containerArticleBig.appendChild(cardBig);
    })
    .catch((error) => {
      console.error(error);
      containerArticleBig.innerHTML = `<p style="color: red;">Gagal mengambil data: ${error}</p>`;
    });
});

const containerArticleMini = document.getElementById("container-artikel-mini");
fetch("https://redmin.test/api/articles")
  .then((response) => response.json())
  .then((data) => {
    const limitedArticles = data.data.slice(0, 5);
    limitedArticles.forEach((article) => {
      const card = document.createElement("a");
      card.href = `article.html?slug=${article.slug}`;
      card.className = "flex gap-2.5 items-stretch";

      card.innerHTML = `
              <img
                src="https://redmin.test/${article.image_url}"
                alt="${article.article_name}"
                class="xl:w-[140px] xl:h-[100px] aspect-video max-w-32 md:max-w-64 xl:max-w-32 object-cover border border-black"
              />
              <div class="flex flex-col justify-between">
                <div>
                  <span
                    class="bg-black text-white py-1 px-3 capitalize text-[10px] inline-block border-black border mb-2"
                  >
                    ${article.article_type || "Apakaden"}
                  </span>
                  <h1 class="font-semibold text-sm capitalize">
                    ${article.article_name}
                  </h1>
                </div>
                <span class="text-xs flex items-center gap-1">
                  <img class="size-4" src="../../public/icons/time.svg" />
                  ${formatTanggal(article.created_at || "Apakaden")}
                </span>
              </div>
      `;

      containerArticleMini.appendChild(card);
    });
  })
  .catch((error) => {
    containerArticleMini.innerHTML = `<p style="color: red;">Gagal mengambil data: ${error}</p>`;
  });

const containerArticleTerbaru = document.getElementById(
  "container-artikel-terbaru"
);
fetch("https://redmin.test/api/articles")
  .then((response) => response.json())
  .then((data) => {
    data.data.forEach((article) => {
      const card = document.createElement("a");
      // card.href = `${article.id}/${article.slug}`;
      card.href = `article.html?slug=${article.slug}`;
      card.className =
        "flex flex-col items-stretch w-auto h-auto border-2 border-b-4 border-black";

      card.innerHTML = `
              <img
                src="https://redmin.test/${article.image_url}"
                alt="${article.article_name}"
                class="aspect-video object-cover"
              />
              <div class="h-full flex flex-col justify-between p-2.5 gap-2.5">
                <div>
                  <span
                    class="bg-black text-white py-1 px-3 capitalize text-[10px] inline-block border-black border mb-2.5"
                  >
                    ${article.article_type || "Apakaden"}
                  </span>
                  <h1 class="font-semibold text-base capitalize">
                    ${article.article_name}
                  </h1>
                </div>
                <span class="text-xs flex items-center gap-1">
                  <img class="size-4" src="../../public/icons/time.svg" />
                  ${formatTanggal(article.created_at || "Apakaden")}
                </span>
              </div>
      `;

      containerArticleTerbaru.appendChild(card);
    });
  })
  .catch((error) => {
    containerArticleTerbaru.innerHTML = `<p style="color: red;">Gagal mengambil data: ${error}</p>`;
  });

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const container = document.getElementById("container-detail-artikel");
console.log("test");

// Fetch detail artikelnya
fetch(`https://redmin.test/api/article/${slug}`)
  .then((res) => res.json())
  .then((article) => {
    container.innerHTML = `
        <h1 class="text-4xl font-bold capitalize">
          ${article.article_name}
        </h1>
        <img
          class="w-full aspect-video object-cover border mb-5"
          src="https://redmin.test/${article.image_url}"
          alt="${article.article_name}"
        />
        <p class="text-lg font-light mb-10">
          Published by <span class="font-semibold">${
            article.author
          }</span> • ${formatTanggal(article.created_at || "Apakaden")}
        </p>
        <p class="leading-loose">
          ${article.content}
        </p>
      `;
  })
  .catch((err) => {
    container.innerHTML = `<p style="color:red;">Gagal memuat artikel: ${err}</p>`;
  });

const containerDetailArticleMini = document.getElementById(
  "container-detail-artikel-mini"
);
fetch("https://redmin.test/api/articles")
  .then((response) => response.json())
  .then((data) => {
    const limitedArticles = data.data.slice(0, 5);
    limitedArticles.forEach((article) => {
      const card = document.createElement("a");
      card.href = "#";
      card.className = "flex gap-2.5 items-stretch";

      card.innerHTML = `
            <img
              src="https://redmin.test/${article.image_url}"
              alt="thumnail-blog"
              class="xl:w-[140px] xl:h-[100px] aspect-video max-w-32 md:max-w-64 xl:max-w-32 object-cover border border-black"
            />
            <div class="flex flex-col justify-between">
              <div>
                <span
                  class="bg-black text-white py-1 px-4 capitalize text-xs inline-block border-black border"
                >
                  ${article.article_type}
                </span>
                <h1 class="font-semibold text-sm">
                  ${article.article_name}
                </h1>
              </div>
              <span class="text-xs">${formatTanggal(
                article.created_at || "Apakaden"
              )}</span>
            </div>
      `;

      containerDetailArticleMini.appendChild(card);
    });
  })
  .catch((error) => {
    containerDetailArticleMini.innerHTML = `<p style="color: red;">Gagal mengambil data: ${error}</p>`;
  });
