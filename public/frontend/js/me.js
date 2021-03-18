$(document).ready(function(){
    $("#gold-price").load("rss/gold-coin",null, function(res, status){
        let data = JSON.parse(res);
        $("#gold-price").html(rederGoldTable(data));
    })
    $("#coin-price").load("rss/coin",null, function(res, status){
        let data = JSON.parse(res);
        $("#coin-price").html(rederCoinTable(data));
    })
    $("#countArticle").load("category/count-Article",null, function(res, status){
        let data = JSON.parse(res);
        $("#countArticle").html(rederListCategory(data));
    })
    //activeMenu
    function activeMenu() {
        var url = window.location.pathname
        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");
            $('#navigation a').each(function(){
                // and test its normalized href against the url pathname regexp
                if(urlRegExp.test(this.href.replace(/\/$/,''))){
                    $(this).addClass('active');
                }
            }); 
    }
    activeMenu()
    //real-time
    function realTime(){
        var d = new Date();
        console.log(d.toDateString())
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
function rederGoldTable(items) {
    let xhtml = '';
    items.forEach(
        (item) => {
            let currentItem = Object.values(item);
            xhtml += `<tr>
                <td>${currentItem[0].type}</td>
                <td>${currentItem[0].buy}</td>
                <td>${currentItem[0].sell}</td>
            </tr>`;
    });
    
    return `<table class="table table-bordered">
            <thead class="thead-light">
                <tr>
                    <th><b>Loại vàng</b></th>
                    <th><b>Mua vào</b></th>
                    <th><b>Bán ra</b></th>
                </tr>
            </thead>
            <tbody>
                ${xhtml}
            </tbody>
        </table>`;
}
function rederCoinTable(items) {
    let xhtml = '';
    items.forEach(
        (item) => {
            let price = Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.quote.USD.price);
            let textColor = item.quote.USD.percent_change_24h > 0 ? 'text-success' : 'text-danger';
            let percentChange = Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(item.quote.USD.percent_change_24h) + "%";
            xhtml += `<tr>
                <td>${item.name}</td>
                <td>${price}</td>
                <td><span class="${textColor}">${percentChange}</span></td>
            </tr>`;
    });
    
    return `<table class="table table-bordered">
            <thead class="thead-light">
                <tr>
                    <th><b>Loại vàng</b></th>
                    <th><b>Mua vào</b></th>
                    <th><b>Bán ra</b></th>
                </tr>
            </thead>
            <tbody>
                ${xhtml}
            </tbody>
        </table>`;
}