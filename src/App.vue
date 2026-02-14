<template>
    <div>
        <header>
            <h1>Trolley Problem Inc.</h1>
            <div class="search-bar">
                <input type="text" v-model="searchTerm" placeholder="Rechercher un dilemme...">
            </div>
        </header>

        <div class="container">
            <template v-for="chapter in chapters" :key="chapter">
                <div class="chapter-title">Chapitre {{ chapter }}</div>

                <DilemmaCard v-for="dilemma in getChapterDilemmas(chapter)" :key="dilemma.key"
                    :dilemma-key="dilemma.key" :data="dilemma.data" />
            </template>
        </div>

        <footer>
            Archive narrative interactive – Version Premium
        </footer>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import DilemmaCard from './components/DilemmaCard.vue'

    const searchTerm = ref('')
    const dilemmasData = ref({})

    onMounted(async () => {
        const response = await fetch('/data.json')
        const data = await response.json()
        dilemmasData.value = data.Rows
    })

    const sortedKeys = computed(() => {
        return Object.keys(dilemmasData.value).sort((a, b) =>
            a.localeCompare(b, undefined, {
                numeric: true
            })
        )
    })

    const filteredDilemmas = computed(() => {
        const term = searchTerm.value.toLowerCase()
        if (!term) return sortedKeys.value

        return sortedKeys.value.filter(key => {
            const d = dilemmasData.value[key]
            const searchText = (d.Title + d.Text_Intro).toLowerCase()
            return searchText.includes(term)
        })
    })

    const chapters = computed(() => {
        const chapterSet = new Set()
        filteredDilemmas.value.forEach(key => {
            const chapter = key.split('.')[0]
            chapterSet.add(chapter)
        })
        return Array.from(chapterSet).sort((a, b) =>
            a.localeCompare(b, undefined, {
                numeric: true
            })
        )
    })

    const getChapterDilemmas = (chapter) => {
        return filteredDilemmas.value
            .filter(key => key.split('.')[0] === chapter)
            .map(key => ({
                key,
                data: dilemmasData.value[key]
            }))
    }
</script>