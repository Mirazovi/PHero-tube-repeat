// menu fetch 
const handleMenuBar = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const Categories = data.data;
    SetMenuBar(Categories);
}
// Main card fetch 
const handleCardShow = async (id=1000 ,sort=false) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const AllCategories = data?.data;
    if(sort){

        AllCategories.sort((a,b) => {
           return parseFloat(b?.others?.views) - parseFloat(a?.others?.views)
    });
        handleCardSet(AllCategories);
    }else{

        handleCardSet(AllCategories);
    }
}
// Onclick menu 
const handleClickMenu = (id) =>{
    handleCardShow(id);
}
// Sort Click 
const handleSort = () =>{
    handleCardShow(1000,true);
}
// card set 
const  handleCardSet = (AllCategories) =>{

    const Container = document.getElementById('container');
    const Error = document.getElementById('error');
    Container.textContent='';
    Error.textContent='';
    
    if(AllCategories.length === 0){
            const div = document.createElement('div');
            div.innerHTML=`
            <div class="flex flex-col justify-center items-center h-[70vh]">
            <img src="/image/Logo.png" >
            <p class="text-2xl font-bold py-4">Oops!! Sorry, There is no content here</p>
            </div>
            `
            Error.appendChild(div);
    }else{
        AllCategories.forEach(categories => {
            const Postdate = categories?.others?.posted_date;
            const hours = Math.floor((Postdate % 86400) / 3600);
            const minutes = Math.floor((Postdate % 3600) / 60);
            console.log(hours,minutes);
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="border p-3 rounded-3xl">
                <div class="relative">
                <img class="rounded-2xl h-[200px]" src=${categories?.thumbnail} >
                <p >${categories?.others?.posted_date ? `<p class="absolute bottom-2 right-2 text-white">${hours}hrs ${minutes}min</p>` : ''}</p>
                </div>
                <div class="flex justify-between items-center my-3">
                <img class="w-[40px] h-[40px] rounded-full " src=${categories?.authors[0]?.profile_picture} >
                <p>${categories?.title}</p>
                </div>
                <div class="flex gap-2 items-center">
                <p>${categories?.authors[0]?.profile_name}</p>
                <p>${categories?.authors[0]?.verified ? 'icons' : ''}</p>
                </div>
                <p>${categories?.others?.views}</p>
                </div>
            `
            Container.appendChild(div);
        }
    )
    }

   
}
handleCardShow()
// menu set 
const SetMenuBar = (Categories) =>{
    const MenuBar = document.getElementById('menu-bar');
    Categories.forEach(menu => {
        const div = document.createElement('div');
        div.classList.add('menu');
        div.innerHTML = `
            <p onclick="handleClickMenu(${menu?.category_id})">${menu?.category}</p>
        `
        MenuBar.appendChild(div);

    })
}
handleMenuBar();
