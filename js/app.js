const loadAllProduct = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.data.news_category;
        // console.log(data.data.news_category);
    } catch (error) {
        console.log(error);
    }

}

const setAllCategory = async () => {
    const data = await loadAllProduct()
    // console.log(data);

    const allCategory = document.getElementById('all-category');

    const uniqueArray = [];

    for (const category of data) {
        // console.log(category.category_name);

        if (uniqueArray.indexOf(category.category_name) === -1) {
            uniqueArray.push(category.category_name);
            // console.log(category.category_name);

            const li = document.createElement('li');
            li.innerHTML = `
            <a onclick="loadAllNews('${category.category_id}')" class="nav-link">${category.category_name}</a>
            `;
            allCategory.appendChild(li);
        }
    }

}

setAllCategory();

const loadAllNews = async category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    console.log(category_id);
    const res = await fetch(url);
    const data = await res.json();
    displayNewItem(data.data);
    // return (data.data);
}

const displayNewItem = newsAll => {
    console.log('newsAll', newsAll);

    const newsDetails = document.getElementById('news-container');
    newsDetails.textContent = '';
    newsAll.forEach(news => {
        console.log('news', news);

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="container card mb-3"">
        <div class="row g-0">
        <div class="col-md-4">
         <img src=${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
         <div class="card-body">
         <h5 class="card-title">${news.title}</h5>
         <p class="card-text">${news.details.length > 300 ? news.details.slice(0, 300) + '...' : news.details}</p>


         <div class="mb-3" style="max-width: 340px;">
            <div class=" row g-0">
                <div class="col-md-4">
                    <img src="${news.author.img ? news.author.img : 'Author Image not found'}" style="width: 50px; height: 50px;" class="rounded-circle" alt="...">
                </div>
                <div class="col-md-8">
                    <h5 class="title">${news.author.name ? news.author.name : 'Author is not found'}</h5>
                    <p class="text">${news.author.published_date ? news.author.published_date : 'Author Published date not found'}</p>

                </div>
            </div>
        </div>


         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
        `;
        newsDetails.appendChild(div);
    })

}

// const displayNewItem = async () => {
//     const data = await loadAllNews()
//     console.log(loadAllNews())
//     const newsDetails = document.getElementById('news-container');

//     // newsDetails.forEach(news => {
//     //     console.log('jjj', news)
//     //     const newsDiv = document.createElement('div');
//     //     newsDetails.innerHTML = `
//     //     <h1>AMi tomake valobasi</h1>
//     //     `;
//     //     newsDetails.appendChild(newsDiv);
//     // })

// }

loadAllNews();