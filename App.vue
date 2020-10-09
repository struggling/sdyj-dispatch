<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/* 默认样式重置 */
	@import "./common/normalize.css";
	/* iconfont字体库 */
	@import "./common/iconfont.css";
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	/* 全局主题颜色theme */
	
	.theme{
		background: linear-gradient(90deg, $themeleft, $themeright) !important;
	}
	
	/* 顶部导航栏自定义 */
	.slot-wrap {
			display: flex;
			align-items: center;
			/* 如果您想让slot内容占满整个导航栏的宽度 */
			/* flex: 1; */
			/* 如果您想让slot内容与导航栏左右有空隙 */
			padding: 0 25rpx;
			color: #FFFFFF;
			padding-bottom: 2upx;
		}
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	  }
</style>

