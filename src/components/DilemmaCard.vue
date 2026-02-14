<template>
    <v-card elevation="2" class="dilemma-card">
        <v-card-title class="dilemma-title">
            <div>
                <div class="dilemma-key">{{ dilemmaKey }}</div>
                <div class="dilemma-name">{{ data.Title || "" }}</div>
            </div>
        </v-card-title>

        <v-card-text>
            <div v-if="data.Intro_Quote" class="quote mt-4 mb-4">
                <v-icon size="small" class="mr-2">mdi-format-quote-open</v-icon>
                {{ data.Intro_Quote }}
                <v-icon size="small" class="ml-2">mdi-format-quote-close</v-icon>
            </div>

            <div v-if="data.Text_Intro" class="intro-text mb-4">
                {{ data.Text_Intro }}
            </div>

            <div v-if="data.Text_Main" class="main-text mb-4">
                {{ data.Text_Main }}
            </div>

            <v-divider class="my-6"></v-divider>

            <div class="choices-title mb-4">
                <v-icon class="mr-2" color="primary">mdi-railway</v-icon>
                Que faites-vous ?
            </div>

            <v-row class="choices">
                <v-col cols="12" md="6">
                    <v-card variant="outlined" class="choice-card" :class="{ 'choice-selected': showFinalA }"
                        @click="showFinalA = !showFinalA" hover>
                        <v-card-title class="choice-title">
                            <v-icon class="mr-2" size="small">mdi-hand-back-left</v-icon>
                            {{ data.Text_Leave || "" }}
                        </v-card-title>
                        <v-card-text>
                            <p v-if="data.Text_01_A" class="choice-text">{{ data.Text_01_A }}</p>
                            <p v-if="data.Text_02_A" class="choice-text">{{ data.Text_02_A }}</p>

                            <v-expand-transition>
                                <div v-show="showFinalA" class="final-text">
                                    <v-divider class="my-3"></v-divider>
                                    <div class="d-flex align-start">
                                        <v-icon class="mr-2 mt-1" size="small" color="primary">mdi-skull</v-icon>
                                        <div>{{ data.FinalText_A || "" }}</div>
                                    </div>
                                </div>
                            </v-expand-transition>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card variant="outlined" class="choice-card" :class="{ 'choice-selected': showFinalB }"
                        @click="showFinalB = !showFinalB" hover>
                        <v-card-title class="choice-title">
                            <v-icon class="mr-2" size="small">mdi-hand-pointing-right</v-icon>
                            {{ data.Text_Action || "" }}
                        </v-card-title>
                        <v-card-text>
                            <p v-if="data.Text_01_B" class="choice-text">{{ data.Text_01_B }}</p>
                            <p v-if="data.Text_02_B" class="choice-text">{{ data.Text_02_B }}</p>

                            <v-expand-transition>
                                <div v-show="showFinalB" class="final-text">
                                    <v-divider class="my-3"></v-divider>
                                    <div class="d-flex align-start">
                                        <v-icon class="mr-2 mt-1" size="small" color="primary">mdi-skull</v-icon>
                                        <div>{{ data.FinalText_B || "" }}</div>
                                    </div>
                                </div>
                            </v-expand-transition>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
    import {
        ref
    } from 'vue'

    defineProps({
        dilemmaKey: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    })

    const showFinalA = ref(false)
    const showFinalB = ref(false)
</script>