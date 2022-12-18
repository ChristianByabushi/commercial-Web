<template>
  <div class="dashboard">
    <v-subheader class="d-flex justify-space-between align-center">
      <h3>Dashboard</h3>
      <v-btn color="#ffff" link to="/merchandise">
        Voir Details
      </v-btn>
    </v-subheader>
    <v-row>
      <v-col lg="6" cols="12">
        <v-alert dense type="success" color="#0091EA">
          Connexion réussie avec succès <strong>Bon travail</strong> !
        </v-alert>
        <v-row>
          <v-col lg="4" cols="12" v-for="(item, index) in specificResult" :key="index">
            <v-card elevation="4" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div class="inline">
                  <strong>{{ item.title }}</strong>
                  <small> (2 dernières semaines)</small>
                </div>
                <v-avatar :color="item.color" size="60">
                  <span class="">{{ item.amounts }}</span>
                </v-avatar>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="6" cols="12">
        <v-card>
         <msg></msg>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import alert from '@/components/alert.vue'
import axios from 'axios' 
import msg from '@/views/messages/listemessage.vue'

export default {
  name: "Dashboard",
  components: {
    alert, 
    msg
  },
  data: () => ({
    specificResult: [],
    generalResult: [],
    created_at: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    DetailsItems: [],
  }),
  methods: {
    async getDashboardanalysis() {
      try {
        const response = await axios.post('lineInvoice/dashboardanalysis/' + this.getDate())
        var result = response.data
        this.specificResult = [
          { title: "Total de produits achétés", color: "#FD00FFFF", amounts: result.totalAmountby.totalAmountBought + ' Units' },
          { title: 'Total de produits Vendus', color: '#FF8800FF', amounts: result.totalAmountSold.totalAmountSold + ' Units' },
          { title: 'Le plus grand résulat réalisé', color: '#00B8FFFF', amounts: result.highSoldAchieved.result + ' $ ' },
          { title: 'Différence entre les achats et les ventes', color: '#00FF69DE', amounts: result.getResultInvoices[1].result + ' $ ' },
        ]
        this.DetailsItems = result.DetailsItems
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