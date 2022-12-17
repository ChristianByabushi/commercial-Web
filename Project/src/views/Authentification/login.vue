<template>
	<v-app id="inspire">
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs10 sm8 md6>
					<v-card class="elevation-12">
						<v-toolbar dark color="primary">
							<v-toolbar-title align-center justify-center>TravailWeb</v-toolbar-title>
						</v-toolbar>

						<v-card-text>
							<v-form @submit.prevent="handleSubmit"> 
								<div class="d-flex">
									<v-icon>person</v-icon>
									<v-text-field name="username" label="Login" required type="text"
										placeholder="username" v-model="username">
									</v-text-field>
								</div>
								<div class="d-flex">
									<v-icon class="lockIcon" @click="activePassWord = !activePassWord">lock</v-icon>
									<v-text-field v-if="activePassWord" required name="password" label="Password"
										type="text" v-model="password"></v-text-field>
									<v-text-field v-else name="password" label="Password" type="password"
										v-model="password">
									</v-text-field>
								</div>
								<alert v-if="msgAlert" :activeClass="classAlert" :msg="msgAlert"></alert>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn type="submit" color="primary">Login</v-btn>
								</v-card-actions>
							</v-form>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
import alert from '@/components/alert.vue'
import axios from 'axios'
export default {
	name: 'Login',
	passwordEnable: true,
	components: {
		alert
	},
	data() {
		return {
			password: '',
			username: '',
			msgAlert: null,
			classAlert: '',
			activePassWord: false,
			logo: ''
		}
	},
	props: {
		source: String,
	},
	methods: {
		async handleSubmit() {
			this.msgAlert = ''
			if (this.password == '' || this.username == '') {
				this.msgAlert = "Veuillez d'abord remplir tous  les champs"
				this.classAlert = "info"
				return
			}
			try {
				const formData = new FormData()
				formData.append('client_id', this.username)
				formData.append('username', this.username)
				formData.append('client_secret', this.password)
				formData.append('password', this.password)
				formData.append('grant_type', 'password')
				const response = await axios.post('user/login', formData)
				if (response.data['access_token']) {
					localStorage.setItem('token', response.data['username'])
					localStorage.setItem('username', this.username)
					if (this.$route.path !== '/')
						this.$router.push('/')
				} else {
					this.msgAlert = "Mot de passe ou username incorrect"
					this.classAlert = "error"
				}
			} catch (e) {
				this.msgAlert = "Mot de passe ou email incorrect"
				this.classAlert = "error"
			}
		},
		method_activePassWord() {
			if (this.activePassWord == '') {
				this.logo = 'lock'
			} else {
				this.logo = 'eye'
			}
			return this.activePassWord
		}
	}
};
</script>

<style scoped>
#logoHuman {
	position: absolute;
	height: 12rem;
	width: 220px;
	margin: 0 auto;
	opacity: 0.09;
}
</style>
