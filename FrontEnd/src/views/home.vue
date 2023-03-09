<template>
    <div class="contain">
        <div id="banner">
            <slideShow />
        </div>
        <div id="contain__content">
            <h2>Giới thiệu về nhà hàng TPT</h2>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 contain-img-first"></div>
                    <div class="wrapper col-sm-6">
                        <div class="contain-img-second">
                            <h3>USSINA – Aging Beef & Bar</h3>
                            <p>USSINA nổi tiếng là một thương hiệu ẩm thực cao cấp đến từ xứ sở Hoa Anh Đào, với rất nhiều
                                nhà hàng tại vùng Nagoya – Nhật Bản.</p>

                            <p>Đến với nhà hàng chúng tôi, quý khách sẽ được trải nghiệm một phong cách ẩm thực hoàn toàn
                                mới lạ, với các món ăn từ thịt bò Wagyu thượng hạng được sử dụng kĩ thuật ủ lạnh trong tuyết
                                lưu truyền hơn 200 năm, chỉ có duy nhất ở nhà hàng chúng tôi tại Việt Nam.</p>

                            <p>Qua bàn tay điêu luyện của các đầu bếp bậc thầy Nhật Bản, nguyên liệu “ Snow Aging Wagyu”
                                được chế biến một cách tinh tế và đặc sắc, để từng thớ thịt mềm tan và dậy lên hương vị làm
                                hài lòng ngay cả những thực khách khó tính nhất.</p>

                            <p>Mỗi nhà hàng, mỗi địa điểm của USSINA đều mang lại những cảm nhận và những trải nghiệm khác
                                nhau,từ không khí ấm cúng gần gũi của USSINA Thảo Điền cho đến không gian sang trọng tinh tế
                                tại lầu 77 của toà nhà cao nhất Việt Nam.</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="wrapper col-sm-6">
                        <div class="contain-img-second">
                            <h3>USSINA – Aging Beef & Bar</h3>
                            <p>USSINA nổi tiếng là một thương hiệu ẩm thực cao cấp đến từ xứ sở Hoa Anh Đào, với rất nhiều
                                nhà hàng tại vùng Nagoya – Nhật Bản.</p>

                            <p>Đến với nhà hàng chúng tôi, quý khách sẽ được trải nghiệm một phong cách ẩm thực hoàn toàn
                                mới
                                lạ,
                                với các món ăn từ thịt bò Wagyu thượng hạng được sử dụng kĩ thuật ủ lạnh trong tuyết lưu
                                truyền
                                hơn
                                200 năm, chỉ có duy nhất ở nhà hàng chúng tôi tại Việt Nam.</p>

                            <p>Qua bàn tay điêu luyện của các đầu bếp bậc thầy Nhật Bản, nguyên liệu “ Snow Aging Wagyu”
                                được
                                chế
                                biến một cách tinh tế và đặc sắc, để từng thớ thịt mềm tan và dậy lên hương vị làm hài lòng
                                ngay
                                cả
                                những thực khách khó tính nhất.</p>

                            <p>Mỗi nhà hàng, mỗi địa điểm của USSINA đều mang lại những cảm nhận và những trải nghiệm khác
                                nhau,
                                từ không khí ấm cúng gần gũi của USSINA Thảo Điền cho đến không gian sang trọng tinh tế tại
                                lầu
                                77của toà nhà cao nhất Việt Nam.</p>
                        </div>
                    </div>
                    <div class="col-sm-6 contain-img-first"></div>
                </div>
            </div>
        </div>

        <div class="booking">
            <div class="container">
                <div class="booking__container">
                    <img src="../assets/images/steak.jpg" alt="">
                    <div class="booking__container-nav-btn">
                        <button @click="gotoOverviewTable" type="button">ĐẶT BÀN</button>
                        <button type="button">THỰC ĐƠN</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="hr"></div>
    </div>
</template>

<script>
import slideShow from "../components/slideShow.vue"
import { useRouter } from 'vue-router';
export default {
    components: { slideShow },
    setup() {
        const router = useRouter();
        function gotoOverviewTable() {
            router.push({ name: 'OverviewTable' })
        }

        return { gotoOverviewTable };
    }
}
</script>

<style scoped>
#banner {
    height: 100vh;
    margin: 0;
}

#contain__content {
    margin-top: 40px;
}

h2 {
    font-family: 'UTM-Pacific-Standard';
    text-align: center;
    color: #981B1E;
    font-weight: 100;
    font-size: 40.4px;
    margin-bottom: 40px;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.contain-img-first {
    background-image: url(https://ussinavietnam.vn/wp-content/uploads/2019/11/Ussina_2-2.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.wrapper {
    background-image: url(https://www.transparenttextures.com/patterns/az-subtle.png);
}

.contain-img-second {
    text-align: justify;
    margin: 30px;
}

.booking {
    background-color: #010101;
    margin-top: 60px;
    text-align: center;
}



.hr {
    height: 1px;
    background-color: #981B1E;
}

.booking__container-nav-btn {
    padding: 30px 0;
}

.booking__container-nav-btn button:first-child {
    font-size: 20px;
    padding: 10px 36px 7px;
    height: 51px;
    background: #981B1E;
    color: #fff !important;
    border: 2px solid #981B1E;
    margin: 0 15px;
    border-radius: 0px;
    text-transform: uppercase;
    font-weight: 900;
    width: 200px;
}

.booking__container-nav-btn button:last-child {
    font-size: 20px;
    padding: 10px 36px 11px;
    height: 51px;
    background: transparent;
    color: #fff;
    border: 2px solid #981B1E;
    margin: 0 15px;
    border-radius: 0px;
    text-transform: uppercase;
    font-weight: 900;
    width: 200px;

}
</style>