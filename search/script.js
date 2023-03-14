let searchbtn = document.querySelector('.search__btn')
let searchinput = document.querySelector('.search__input')
let searchResults = document.querySelector('.search__results');


async function searchRepositories(queryinput) {
  let url = `https://api.github.com/search/repositories?q=${queryinput}&per_page=10`;
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
  }

  let data = await response.json();
 
  if (data.items.length === 0) {
    alert("Ничего не найдено");
    return;
  }else {
      data.items.forEach(item => {
      let li = document.createElement('li');
      let repoUrl = document.createElement('a');
      repoUrl.href = item.html_url;
      repoUrl.target = "_blank";
      repoUrl.innerText = 'Name: ' + item.full_name + '/' + '\n' + 'Visibility: ' + item.visibility ;

      li.appendChild(repoUrl);
      searchResults.appendChild(li);
      console.log(data)
      });
  }
}

searchbtn.addEventListener('click', function(event){
  event.preventDefault(); 
  let queryinput = searchinput.value;
  searchRepositories(queryinput);
})

searchbtn.addEventListener('keyup', function(e){
  if(e.keyCode == 13){
    let queryinput = searchinput.value;
    searchRepositories(queryinput);
  }
})



