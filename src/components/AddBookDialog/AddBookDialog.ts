import { Component, Vue, Prop } from "vue-property-decorator";

@Component

export default class AddBookDialog extends Vue {
    @Prop()
    dialogVisible!: boolean
}