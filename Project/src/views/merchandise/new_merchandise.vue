<template>
  <div class="new_merchandise">
    <form @submit.prevent="submit_merchandise()" method="post">
      <v-text-field v-model="title" :counter="255" required label="Name">
      </v-text-field>
      <v-text-field v-model="description" label="description" required :counter="255"> </v-text-field>
      <v-select :items="items_categorie" v-model="categorie" label="Catégorie"></v-select>
      <v-btn type="submit" class="mr-4 center">
        Enregistrer
      </v-btn>
    </form>
  </div>
</template>
<script>
import alert from '@/components/alert.vue'
import axios from 'axios'
export default {
  name: "new_merchandise",
  components: {
    alert 
  },
  data: () => ({
    title: '',
    description: '',
    categorie: '',
    items_categorie: ['Voitures', 'Matelas', 'Vetements', 'Autres'],
  }),
  methods: {
    async submit_merchandise() {
      try {
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('categorie', this.categorie)
        const response = await axios.post('merchandise/create', formData)
        alert('Bien ' + this.title + ' ajouté avec succès')
      } catch (e) {
        console.log(e)
      }
    },
    async getDashboardanalysis() {
      try {
        const response = await axios.post('lineInvoice/dashboardanalysis/' + this.getDate())
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    },
    getDate() {
      var twoWeeks = 1000 * 60 * 60 * 24 * 14;
      var twoWeeksTime = new Date(new Date().getTime() - twoWeeks);
      var formattedDate = twoWeeksTime.getFullYear() + '-' + (twoWeeksTime.getMonth() + 1) + '-' + twoWeeksTime.getDate();
      return formattedDate
    }
  },
  created() {
    this.getDashboardanalysis()
    this.getDate()
  }
}
</script>