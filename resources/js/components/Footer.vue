<script>
/**
 * Footer Component
 */
export default {}
</script>

<template>
<!-- Footer Start -->
<footer class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                {{ new Date().getFullYear()}} &copy;  {{$t('general.AllRightsReservedTo')}} <a href="#" class="link-footer">{{$t('general.Alshamel')}} - {{ env('MIX_VERSION') }}</a>
            </div>
<!--            <div class="col-md-6">-->
<!--                <div class="text-md-right footer-links d-none d-sm-block">-->
<!--                    <a href="javascript:void(0);">About Us</a>-->
<!--                    <a href="javascript:void(0);">Help</a>-->
<!--                    <a href="javascript:void(0);">Contact Us</a>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
</footer>
<!-- end Footer -->
</template>
<style scoped>
.link-footer{
    color: black;
    font-weight: bold;
}
.link-footer:hover{
    color: rgb(0, 163, 244);
    font-weight: bold;
}
</style>
