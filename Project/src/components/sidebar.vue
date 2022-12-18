<template>
	<v-navigation-drawer :value="getDrawer" app>
		<v-img max-height="82" max-width="150" src="@/assets/logo.png" class="ml-7">
		</v-img>
		<v-divider></v-divider>
		<div>
			<div v-if="userInfo.scope == 'admin'">
				<v-list v-for="[icon, text, color, link] in linksAdmin" :key="icon" link>
					<v-list-item :to="{ name: link }">
						<v-list-item-icon>
							<v-icon :color="color">{{ icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content @click="link == '/login' ? logout() : donothing()">
							<v-list-item-title :color="color">{{ text }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</div>

			<div v-if="userInfo.scope == 'agent'">
				<v-list v-for="[icon, text, color, link] in linksAgent" :key="icon" link>
					<v-list-item :to="{ name: link }">
						<v-list-item-icon>
							<v-icon :color="color">{{ icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content @click="link == '/login' ? logout() : donothing()">
							<v-list-item-title :color="color">{{ text }}</v-list-item-title>
						</v-list-item-content>

					</v-list-item>
				</v-list>
			</div>

		</div>

	</v-navigation-drawer>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
	name: 'Sidebar',
	data: () => ({
		linksAdmin: [
			['mdi-microsoft-windows', 'Dashboard', '#C51162', 'dashboard'],
			['mdi-chart-areaspline', 'Analyse', '#9C27B0', 'analysis'],
			['mdi-message', 'Messages', '#607D8B', 'indexMsg'],
			['mdi-account-cog', 'Gestion compte', '#607D8B', 'listusers'],
		],
		linksAgent: [
			['mdi-cloud-print-outline', 'Facturation', '#673AB7', 'invoice'],
			['mdi-baby-buggy', 'Marchandises', '#BA68C8', 'merchandise'],
			['mdi-chart-areaspline', 'Analyse', '#2196F3', 'analysis'],
			['mdi-comment-processing-outline', 'Messages', '#15552', 'indexMsg'],
		],

	}),
	methods: {
		logout() {
			console.log(1)
			localStorage.removeItem('token')
		},
		donothing() {

		}
	},
	computed: {
		...mapGetters(['getDrawer']),
		...mapState(['userInfo'])
	}
}
</script>
<style scoped>

</style>