const containerArticleTerbaru = document.getElementById(
  "container-artikel-terbaru"
);

fetch("https://radmin.test/api/articles")
  .then((response) => response.json())
  .then((data) => {
    data.data.forEach((article) => {
      const card = document.createElement("a");
      card.href = "#";
      card.className =
        "flex flex-col items-stretch w-auto h-auto border-2 border-b-4 border-black";

      card.innerHTML = `
              <img
                src="${article.image_url}"
                alt="${article.article_name}"
                class="aspect-video object-cover"
              />
              <div class="h-full flex flex-col justify-between p-2.5 gap-2.5">
                <div>
                  <span
                    class="bg-black text-white py-1 px-4 capitalize text-xs inline-block border-black border mb-2.5"
                  >
                    ${article.article_type || "Apakaden"}
                  </span>
                  <h1 class="font-semibold text-sm">
                    ${article.article_name}
                  </h1>
                </div>
                <span class="text-xs">${article.created_at || "Apakaden"}</span>
              </div>
      `;

      containerArticleTerbaru.appendChild(card);
    });
  })
  .catch((error) => {
    containerArticleTerbaru.innerHTML = `<p style="color: red;">Gagal mengambil data: ${error}</p>`;
  });

const containerArticleMini = document.getElementById("container-artikel-mini");

fetch("https://radmin.test/api/articles")
  .then((response) => response.json())
  .then((data) => {
    // Batasi hanya 4 artikel
    const limitedArticles = data.data.slice(0, 4);

    limitedArticles.forEach((article) => {
      const card = document.createElement("a");
      card.href = "#";
      card.className = "flex gap-2.5 items-stretch";

      card.innerHTML = `
              <img
                src="${article.image_url}"
                alt="${article.article_name}"
                class="xl:w-[140px] xl:h-[100px] aspect-video max-w-32 md:max-w-64 xl:max-w-32 object-cover border border-black"
              />
              <div class="flex flex-col justify-between">
                <div>
                  <span
                    class="bg-black text-white py-1 px-4 capitalize text-xs inline-block border-black border"
                  >
                    ${article.article_type || "Apakaden"}
                  </span>
                  <h1 class="font-semibold text-sm">
                    ${article.article_name}
                  </h1>
                </div>
                <span class="text-xs">${article.created_at || "Apakaden"}</span>
              </div>
      `;

      containerArticleMini.appendChild(card);
    });
  })
  .catch((error) => {
    containerArticleMini.innerHTML = `<p style="color: red;">Gagal mengambil data: ${error}</p>`;
  });
