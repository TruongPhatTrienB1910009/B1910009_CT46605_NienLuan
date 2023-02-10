<template>
    <header>
        <div id="logo">LOGO</div>
        <nav id="navBar">
            <ul class="">
                <li class="">
                    <router-link :to='{ name: "Home" }' class="router-link">Trang Chủ</router-link>
                </li>
                <li class="">
                    <router-link :to='{ name: "Register" }' class="router-link">Đăng Ký</router-link>
                </li>
                <li class="">
                    <router-link :to='{ name: "Login" }' class="router-link">Đăng Nhập</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 7%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    z-index: 100;
}

#logo {
    font-weight: bolder;
    font-size: 25px;
    color: #333;
}

#navBar ul {
    list-style: none;
}

#navBar ul li {
    position: relative;
    float: left;

}

#navBar ul li .router-link {
    font-size: 20px;
    padding: 20px;
    color: #333;
    display: block;
    text-decoration: none;
}

#navBar ul li .router-link:hover {
    background: #333;
    color: #fff;
}
</style>