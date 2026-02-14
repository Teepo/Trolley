<template>
    <v-app>
        <v-app-bar color="surface" elevation="1" class="app-bar">
            <v-app-bar-title class="text-center">
                <div class="app-title">Trolley Problem</div>
            </v-app-bar-title>
        </v-app-bar>

        <v-main>
            <v-container>
                <v-row justify="center" class="mb-6">
                    <v-col cols="12" sm="8" md="6">
                        <v-text-field v-model="searchTerm" label="Rechercher un dilemme..."
                            prepend-inner-icon="mdi-magnify" variant="outlined" density="comfortable" hide-details
                            clearable></v-text-field>
                    </v-col>
                </v-row>

                <template v-for="chapter in chapters" :key="chapter">
                    <v-row>
                        <v-col cols="12">
                            <div class="chapter-title">
                                <v-icon class="mr-2" color="primary">mdi-book-open-variant</v-icon>
                                Chapitre {{ chapter }}
                            </div>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" v-for="dilemma in getChapterDilemmas(chapter)" :key="dilemma.key">
                            <DilemmaCard :dilemma-key="dilemma.key" :data="dilemma.data" />
                        </v-col>
                    </v-row>
                </template>
            </v-container>

            <v-footer class="text-center mt-10" color="transparent">
                <v-col cols="12">
                    <div class="text-secondary">
                        Archive narrative interactive – Version Premium
                    </div>
                </v-col>
            </v-footer>
        </v-main>
    </v-app>
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
        const term = searchTerm.value?.toLowerCase() || ''
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