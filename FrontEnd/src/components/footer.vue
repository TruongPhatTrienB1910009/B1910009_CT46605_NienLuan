<template>
    <footer>
        <div class="overlay">
            <div class="container">
                <div class="row">
                    <div id="footer-left" class="col-sm-6">
                        <img src="../assets/images/img.png" alt="" class="logo">
                        <div class="info">
                            <p><i class="fa-solid fa-location-dot"></i> Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. CT
                            </p>
                            <p><i class="fa-solid fa-phone"></i> 0787899778</p>
                            <p><i class="fa-solid fa-envelope"></i> Trienb1910009@student.ctu.edu.vn</p>
                        </div>
                    </div>
                    <div class="col-sm-6"></div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer {
    width: 100%;
    background-image: url(https://ussinavietnam.vn/wp-content/uploads/2019/08/menu-bg3.jpg);
    color: #B4B4B4;
    font-weight: 400;
    font-family: 'UTM-BryantLG';
    font-size: 14px;
}



.logo {
    width: 80px;
    height: 80px;
    margin-top: 10px;
}

#footer-left {
    display: flex;
    align-items: center;
}

.info {
    margin-left: 15px;
    margin-top: 5px;
}

.info p {
    margin: 5px 0 0 0;
    font-size: 13px;
}
</style>