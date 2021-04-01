$(document).ready(function(){
    $("#countArticle").load("/tin-tuc/count-Article",null, function(res, status){
        let data = JSON.parse(res);
        $("#countArticle").html(rederListCategory(data));
    })
    //activeMenu
    function activeMenu() {
        var arrPathname = window.location.pathname;
        arrPathname = (arrPathname=='/')  ? '#' : arrPathname;
        $('a[href="'+ arrPathname +'"]').addClass('active');
        if(arrPathname === '/tin-tuc/am-nhac' || arrPathname === '/tin-tuc/phap-luat' || arrPathname === '/tin-tuc/bong-da'){
            $('a[href="'+ arrPathname +'"]').parent().parent().parent().addClass('active');
        }
    }

    activeMenu()

    //real-time
    function realTime(){
        const d = new Date()
        const ye = new Intl.DateTimeFormat('vi', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('vi', { month: 'long' }).format(d)
        const da = new Intl.DateTimeFormat('vi', { day: '2-digit' }).format(d)
        $('#realtime a').html(`${da}, ${mo}, ${ye}`);
    }

    $('input[name="keyword"]').bind("enterKey",function(e){
        //do stuff here
     });

     $('input[name="keyword"]').keyup(function(e){
         if(e.keyCode == 13)
         {
             $(this).trigger("enterKey");
         }
    });

    realTime()

    if(typeof(Storage) !== "undefined"){
        for (i=0; i<localStorage.length; i++)  {  
            key = localStorage.key(i);  
            data =  JSON.parse(localStorage.getItem(key))
            $("#data-" + data[0].category.slug).html(rederNewsBox(data));
            $("a#" + key).addClass("active show")
            $("div#" + key+ "-a").addClass("active show")
            $("a#nav-home-tab").removeClass("active show")
            $("div#nav-home").removeClass("active show")
        }
    }else{
        $("a#nav-home-tab").addClass("active show")
        $("a#" + key).removeClass("active show")
        $("div #" + key+ "-a").removeClass("active show")
    }

    $('a#nav-home-tab').click(function(){
        localStorage.clear();
    })
}) 

function loadData(slug, url){
    $("#data-" + slug).load(url,null, function(res, status){
        let data = JSON.parse(res);
        localStorage.clear();
        localStorage.setItem(slug, JSON.stringify(data))
        $("#data-" + slug).html(rederNewsBox(data));
    }) 
}
function rederListCategory(items) {
    let xhtml = '';
    items.forEach( item =>{
        xhtml += `
                    <li>
                        <a href="tin-tuc/${item.slug}" class="d-flex">
                            <p>${item.name} (${item.totalsItems})</p>
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
                        <span class="color1"><a href="/tin-tuc/${item.category.slug}">${item.category.name}</a></span>
                        <h4><a href="/tin-tuc/${item.slug}-a">${item.name}</a></h4>
                    </div>
                </div>
            </div>
        `
    );
    
    return xhtml;
}
