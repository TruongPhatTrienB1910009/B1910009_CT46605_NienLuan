<template>
    <div class="container">
        <div class="contain">
            <div id="banner" class="row">
                <div class="left-column col-sm-8">
                    <slideShow />
                </div>
                <div class="right-column col-sm-4">
                    <img class="seafood" src="../assets/images/img.png" alt="">
                    <div class="image__icon">
                        <a href="">
                            <img src="../assets/images/facebook.png" alt="">
                        </a>
                        <a href="">
                            <img src="../assets/images/twitter.png" alt="">
                        </a>
                        <a href="">
                            <img src="../assets/images/instagram.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
            <div id="banner__options">

            </div>
        </div>
    </div>
</template>

<script>
import slideShow from "../components/slideShow.vue"

export default {
    components: { slideShow },
    setup() {

    }
}
</script>

<style scoped>
.contain {
    margin-top: 120px;
}

#banner {
    background-color: #fff;
    padding: 10px;
    height: 360px;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
}

#banner .left-column {
    width: 100%;
    height: 100%;
    padding: 0;
}



#banner .right-column {
    padding-right: 0;
}

#banner .right-column .seafood {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 5px;
}


.right-column .image__icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.right-column .image__icon img {
    width: 60px;
    height: 60px;
    margin: 24px 12px 0 12px;
    transition: transform .2s;
}

.right-column .image__icon img:hover {
    transform: scale(1.5);
}

#banner__options {
    width: 100%;
    height: 120px;
    padding: 20px;
    background-color: #fff;
    margin: 20px 0 70px 0;
}
</style>