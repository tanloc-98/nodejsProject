$(document).ready(function(){
    $("#countArticle").load("category/count-Article",null, function(res, status){
        let data = JSON.parse(res);
        $("#countArticle").html(rederListCategory(data));
    })
    //activeMenu
    function activeMenu() {
        var arrPathname = window.location.pathname
        arrPathname = (arrPathname=='/')  ? '#' : arrPathname;
        $('a[href="'+ arrPathname +'"]').addClass('active');
    }

    activeMenu()
    //real-time
    function realTime(){
        var d = new Date();
        $('#realtime a').html(d.toDateString());
    }
    realTime()
})

function loadData(id, url){
    $("#data-" + id).load(url,null, function(res, status){
        let data = JSON.parse(res);
        $("#data-" + id).html(rederNewsBox(data));
    }) 
}
function rederListCategory(items) {
    let xhtml = '';
    items.forEach( item =>{
        xhtml += `
                    <li>
                        <a href="#" class="d-flex">
                            <p>${item.name}</p>
                            <p>(${item.totalsItems})</p>
                        </a>
                    </li>
                `                   
    })  
    return   xhtml;
}

function rederNewsBox(items) {
    let xhtml = '';
    items.forEach(
        (item) => 
        xhtml += 
        `
            <div class="col-lg-6 col-md-6">
                <div class="single-what-news mb-100">
                    <div class="what-img">
                        <img src="uploads/article/${item.thumb}" alt="" class="img_itemsRandom_home">
                    </div>
                    <div class="what-cap">
                        <span class="color1"><a href="/category/${item.category.id}">${item.category.name}</a></span>
                        <h4><a href="/article/${item._id}">${item.name}</a></h4>
                    </div>
                </div>
            </div>
        `
    );
    
    return xhtml;
}