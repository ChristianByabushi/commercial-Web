<template>
	<v-app id="inspire">
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md4>
					<v-card class="elevation-12">
						<v-toolbar dark color="primary">
							<v-toolbar-title>Registration form</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form>
								<v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>

								<v-text-field id="password" prepend-icon="lock" name="password" label="Password"
									type="password"></v-text-field>
							</v-form>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary" to="/admin">Login</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
export default {
	name: 'Login',
	passwordEnable: true,
	props: {
		source: String
	},
};
</script>

<style>
</style>
