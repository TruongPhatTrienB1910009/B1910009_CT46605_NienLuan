<template>
    <nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <router-link :to='{ name: "Home" }' class="nav-link">Trang Chủ</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to='{ name: "Register" }' class="nav-link">Đăng Ký</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to='{ name: "Login" }' class="nav-link">Đăng Nhập</router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
</template>

<style scoped>
#navBar {
    position: fixed;
    z-index: 100;
    width: 100%;
}
</style>