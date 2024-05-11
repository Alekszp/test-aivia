<template>
  <v-sheet class="game">
    <v-text-field label="Розмір X" v-model.number="x"></v-text-field>
    <v-text-field label="Розмір Y" v-model.number="y"></v-text-field>
    <v-btn @click="draw">draw</v-btn>

    <div class="bg-grey mt-5">
      <table v-if="showTable">
        <tr v-for="(n, i) in y" :key="i">
          <td
            v-for="(s, k) in x"
            :key="k"
            class="cell"
            width="36px"
            height="36"
            :ref="`${n}-${s}`"
            @mouseenter="hover(`${n}-${s}`)"
          ></td>
        </tr>
      </table>
    </div>
  </v-sheet>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const x = ref(0)
    const y = ref(0)
    const showTable = ref(false)

    return {
      x,
      y,
      showTable
    }
  },
  methods: {
    draw() {
      if (this.x && typeof this.x === 'number' && this.y && typeof this.y === 'number') {
        this.showTable = true
      } else {
        return
      }
    },
    hover(item) {
      const cell = this.$refs[item][0].style.background
      if (cell === 'blue') {
        this.$refs[item][0].style.background = 'white'
      } else {
        this.$refs[item][0].style.background = 'blue'
      }
    }
  }
}
</script>

<style scoped>
.game {
  width: 100%;
}

.game td {
  background: white;
}
</style>
