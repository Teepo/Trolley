<template>
    <div class="dilemma">
        <h2>{{ dilemmaKey }} – {{ data.Title || "" }}</h2>
        <div class="quote">{{ data.Intro_Quote || "" }}</div>
        <div class="intro">{{ data.Text_Intro || "" }}</div>
        <div class="leave">{{ data.Text_Main || "" }}</div>

        <div class="choices">
            <div class="choice" @click="showFinalA = !showFinalA">
                <h3>{{ data.Text_Leave || "" }}</h3>
                <p>{{ data.Text_01_A || "" }}</p>
                <p>{{ data.Text_02_A || "" }}</p>
                <div class="final" v-show="showFinalA">{{ data.FinalText_A || "" }}</div>
            </div>

            <div class="choice" @click="showFinalB = !showFinalB">
                <h3>{{ data.Text_Action || "" }}</h3>
                <p>{{ data.Text_01_B || "" }}</p>
                <p>{{ data.Text_02_B || "" }}</p>
                <div class="final" v-show="showFinalB">{{ data.FinalText_B || "" }}</div>
            </div>
        </div>
    </div>
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