//first write a cookie
document.cookie="danTest=test";
//then test if cookie is retrievable
(document.cookie.indexOf("danTest")!=-1)?cookieEnabled=true:cookieEnabled=false;
//alert(cookieEnabled);