<template>
    <div id="profileContainer" class="container">
        <div class="row">
            <div id="navBarLeft" class="col-sm-2">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="">
                <ul>
                    <li>THÔNG TIN</li>
                    <li>BÀN CỦA BẠN</li>
                    <li @click="logOut">ĐĂNG XUẤT</li>
                </ul>
            </div>
            <div class="col-sm-10">
                <h2>THÔNG TIN</h2>
            </div>
        </div>
</div>
</template>

<script>

export default {

    emits: ['logoutUser'],
    setup(props, { emit }) {

        function logOut() {
            emit('logoutUser');
        }

        return {
            logOut
        }
    }
}
</script>

<style scoped>
.container .row img {
    width: 100%;
}

#profileContainer {
    height: 100%;
    border-left: 2px solid #ccc;
    border-right: 2px solid #ccc;
}

#navBarLeft {
    padding: 0;
}

ul {
    list-style: none;
    text-align: center;
    background: #ccc;
}

ul li {
    padding: 10px;
}

ul li:hover {
    background-color: antiquewhite;
    cursor: pointer;
}
</style>