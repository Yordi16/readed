const BASE_URL = "https://redmin.test";

function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  return isNaN(date)
    ? "-"
    : date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

let cachedArticles = null;

function getArticles() {
  if (cachedArticles) return Promise.resolve(cachedArticles);
  return fetch(`${BASE_URL}/api/articles`)
    .then((res) => res.json())
    .then((data) => {
      cachedArticles = data.data;
      return cachedArticles;
    });
}

function renderBigArticle(article) {
  const container = document.getElementById("container-artikel-big");
  if (!container) return;

  const card = document.createElement("a");
  card.href = `article.html?slug=${article.slug}`;
  card.className = "xl:w-2/3";
  card.innerHTML = `
      <img 
        src="${BASE_URL}/${article.image_url}"
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
        <img loading="lazy" class="size-4" src="../../public/icons/time.svg" />
        ${formatTanggal(article.created_at)}
      </span>
    `;
  container.appendChild(card);
}

function renderMiniArticles(articles) {
  const container = document.getElementById("container-artikel-mini");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  articles.forEach((article) => {
    const card = document.createElement("a");
    card.href = `article.html?slug=${article.slug}`;
    card.className = "flex gap-2.5 items-stretch";
    card.innerHTML = `
        <img 
          src="${BASE_URL}/${article.image_url}"
          alt="${article.article_name}"
          class="xl:w-[140px] xl:h-[100px] aspect-video max-w-32 md:max-w-64 xl:max-w-32 object-cover border border-black"
        />
        <div class="flex flex-col justify-between">
          <div>
            <span class="bg-black text-white py-1 px-3 capitalize text-[10px] inline-block border-black border mb-2">
              ${article.article_type || "Apakaden"}
            </span>
            <h1 class="font-semibold text-sm capitalize">
              ${article.article_name.slice(0, 30)}${
      article.article_name.length > 30 ? "..." : ""
    }
            </h1>
          </div>
          <span class="text-xs flex items-center gap-1">
            <img loading="lazy" class="size-4" src="../../public/icons/time.svg" />
            ${formatTanggal(article.created_at)}
          </span>
        </div>
      `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function renderArticlesTerbaru(articles) {
  const container = document.getElementById("container-artikel-terbaru");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  articles.forEach((article) => {
    const card = document.createElement("a");
    card.href = `article.html?slug=${article.slug}`;
    card.className =
      "flex flex-col items-stretch border-2 border-b-4 border-black hover:scale-[102%] duration-100";
    card.innerHTML = `
        <img 
          src="${BASE_URL}/${article.image_url}"
          alt="${article.article_name}"
          class="aspect-video object-cover"
        />
        <div class="h-full flex flex-col justify-between p-2.5 gap-2.5">
          <div>
            <span class="bg-black text-white py-1 px-3 capitalize text-[10px] inline-block border-black border mb-2.5">
              ${article.article_type || "Apakaden"}
            </span>
            <h1 class="font-semibold text-base capitalize">
              ${article.article_name}
            </h1>
          </div>
          <span class="text-xs flex items-center gap-1">
            <img loading="lazy" class="size-4" src="../../public/icons/time.svg" />
            ${formatTanggal(article.created_at)}
          </span>
        </div>
      `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function renderDetailMiniArticles(articles) {
  const container = document.getElementById("container-detail-artikel-mini");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  articles.forEach((article) => {
    const card = document.createElement("a");
    card.href = `article.html?slug=${article.slug}`;
    card.className = "flex gap-2.5 items-stretch";
    card.innerHTML = `
        <img
          loading="lazy"
          src="${BASE_URL}/${article.image_url}"
          alt="${article.article_name}"
          class="xl:w-[140px] xl:h-[100px] aspect-video max-w-32 md:max-w-64 xl:max-w-32 object-cover border border-black"
        />
        <div class="flex flex-col justify-between">
          <div>
            <span class="bg-black text-white py-1 px-4 capitalize text-xs inline-block border-black border">
              ${article.article_type || "Apakaden"}
            </span>
            <h1 class="font-semibold text-sm">
              ${article.article_name}
            </h1>
          </div>
          <span class="text-xs">${formatTanggal(article.created_at)}</span>
        </div>
      `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function renderDetailArticlePage() {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const container = document.getElementById("container-detail-artikel");
  if (!container || !slug) return;

  fetch(`${BASE_URL}/api/article/${slug}`)
    .then((res) => res.json())
    .then((article) => {
      container.innerHTML = `
          <h1 class="text-4xl font-bold capitalize">${article.article_name}</h1>
          <img
            loading="lazy"
            class="w-full aspect-video object-cover border mb-5"
            src="${BASE_URL}/${article.image_url}"
            alt="${article.article_name}"
          />
          <p class="text-lg font-light mb-10">
            Published by <span class="font-semibold">${article.author}</span> • 
            ${formatTanggal(article.created_at)}
          </p>
          <p class="leading-loose">${article.content}</p>
        `;
    })
    .catch((err) => {
      container.innerHTML = `<p style="color:red;">Gagal memuat artikel: ${err}</p>`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // render semua
  getArticles()
    .then((articles) => {
      renderBigArticle(articles[7]);
      renderMiniArticles(articles.slice(1, 6));
      renderArticlesTerbaru(articles);
      renderDetailMiniArticles(articles.slice(0, 5));
    })
    .catch((err) => {
      console.error("Gagal mengambil data:", err);
    });

  // render detail
  renderDetailArticlePage();
});
