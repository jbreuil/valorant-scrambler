<template>
  <div class="container mx-auto">
    <!-- map -->
    <div class="md:my-4 flex flex-row justify-center">
      <Map class="font-bold" :map="map" />
    </div>
    <!-- actions -->
    <div
      class="mx-2 sm:mx-0 my-4 flex flex-row justify-between sm:justify-center sm:space-x-4"
    >
      <button
        id="scramble-teams"
        class="btn btn-orange capitalize"
        @click="scrambleTeams"
      >
        <font-awesome-icon
          class="mr-2"
          :icon="['fas', 'random']"
          size="lg"
        />scramble teams
      </button>
      <button
        id="reroll-map"
        class="btn btn-orange capitalize"
        @click="rollMap"
      >
        <font-awesome-icon
          class="mr-2"
          :icon="['fas', 'redo-alt']"
          size="lg"
        />reroll map
      </button>
    </div>

    <!-- teams -->
    <div class="my-2 flex flex-row justify-between">
      <!-- attackers -->
      <div id="attackers" class="w-1/2 md:w-2/5 flex flex-col space-y-px">
        <button
          id="reroll-att-agents"
          class="btn btn-red mb-4 md:mb-8 capitalize md:w-2/3 mx-auto"
          @click="scrambleAttackersAgents"
        >
          <font-awesome-icon
            class="mx-2"
            :icon="['fas', 'dice']"
            size="lg"
          />reroll agents
        </button>
        <div class="flex att-title items-center">
          <h3 class="flex-grow text-center">ATTACKERS</h3>
        </div>
        <PlayerSlot
          v-for="player in attackers"
          :key="player.id"
          v-model="player.name"
          :agent="player.agent"
          variant="red"
        />
      </div>
      <div class="md:w-1/5" />
      <!-- team 2 -->
      <div id="defenders" class="w-1/2 md:w-2/5 flex flex-col space-y-px">
        <button
          id="reroll-def-agents"
          class="btn btn-teal mb-4 md:mb-8 capitalize md:w-2/3 mx-auto"
          @click="scrambleDefendersAgents"
        >
          <font-awesome-icon
            class="mx-2"
            :icon="['fas', 'dice']"
            size="lg"
          />reroll agents
        </button>
        <div class="flex def-title items-center">
          <h3 class="flex-grow text-center">DEFENDERS</h3>
        </div>
        <PlayerSlot
          v-for="player in defenders"
          :key="player.id"
          v-model="player.name"
          :agent="player.agent"
          variant="teal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerSlot from '@/components/PlayerSlot'
import Map from '@/components/Map'

export default {
  components: {
    PlayerSlot,
    Map,
  },
  data() {
    return {
      map: 'ascent',
      maps: ['ascent', 'bind', 'haven', 'split'],
      player1: {
        id: 1,
        name: 'Player 1',
        agent: 'breach',
        position: 0,
      },
      player2: {
        id: 2,
        name: 'Player 2',
        agent: 'brimstone',
        position: 1,
      },
      player3: {
        id: 3,
        name: 'Player 3',
        agent: 'cypher',
        position: 2,
      },
      player4: {
        id: 4,
        name: 'Player 4',
        agent: 'jett',
        position: 3,
      },
      player5: {
        id: 5,
        name: 'Player 5',
        agent: 'killjoy',
        position: 4,
      },
      player6: {
        id: 6,
        name: 'Player 6',
        agent: 'breach',
        position: 5,
      },
      player7: {
        id: 7,
        name: 'Player 7',
        agent: 'brimstone',
        position: 6,
      },
      player8: {
        id: 8,
        name: 'Player 8',
        agent: 'cypher',
        position: 7,
      },
      player9: {
        id: 9,
        name: 'Player 9',
        agent: 'jett',
        position: 8,
      },
      player10: {
        id: 10,
        name: 'Player 10',
        agent: 'killjoy',
        position: 9,
      },
      agents: [
        'breach',
        'brimstone',
        'cypher',
        'jett',
        'killjoy',
        'omen',
        'phoenix',
        'raze',
        'reyna',
        'sage',
        'sova',
        'viper',
      ],
    }
  },
  computed: {
    players() {
      return [
        this.player1,
        this.player2,
        this.player3,
        this.player4,
        this.player5,
        this.player6,
        this.player7,
        this.player8,
        this.player9,
        this.player10,
      ]
    },
    attackers() {
      return this.players.filter((player) => player.position < 5)
    },
    defenders() {
      return this.players.filter((player) => player.position > 4)
    },
  },
  created() {
    this.rollMap(true)
    this.scrambleAttackersAgents()
    this.scrambleDefendersAgents()
  },
  methods: {
    rollMap(canRollSame = false) {
      let newMap = this.maps[
        Math.floor(Math.random() * Math.floor(this.maps.length))
      ]
      if (!canRollSame) {
        while (this.map === newMap) {
          newMap = this.maps[
            Math.floor(Math.random() * Math.floor(this.maps.length))
          ]
        }
      }

      this.map = newMap
    },
    scrambleTeams() {
      let positionsToAssign = Array.from(Array(10).keys())
      positionsToAssign = this.shuffle(positionsToAssign)
      this.players.forEach(
        (player) => (player.position = positionsToAssign.pop())
      )
      this.scrambleAttackersAgents()
      this.scrambleDefendersAgents()
    },
    scrambleAttackersAgents() {
      const agentsToAssign = this.shuffle([...this.agents])
      this.attackers.forEach((player) => (player.agent = agentsToAssign.pop()))
    },
    scrambleDefendersAgents() {
      const agentsToAssign = this.shuffle([...this.agents])
      this.defenders.forEach((player) => (player.agent = agentsToAssign.pop()))
    },
    shuffle(array) {
      let currentIndex = array.length
      let temporaryValue
      let randomIndex

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    },
  },
}
</script>

<style lang="postcss" scoped>
.att-title {
  @apply font-bold bg-red-400 text-white;
}

.def-title {
  @apply font-bold bg-teal-400 text-white;
}

.att-slot {
  @apply bg-red-300 text-white;
}

.def-slot {
  @apply bg-teal-300 text-white;
}

.btn {
  @apply font-bold py-2 px-4 rounded;
}

.btn-red {
  @apply bg-red-500 text-white;
}

.btn-red:hover {
  @apply bg-red-700;
}

.btn-teal {
  @apply bg-teal-500 text-white;
}

.btn-teal:hover {
  @apply bg-teal-700;
}

.btn-orange {
  @apply bg-orange-400 text-white;
}

.btn-orange:hover {
  @apply bg-orange-500;
}
</style>
