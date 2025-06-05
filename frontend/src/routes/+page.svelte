<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { formSchema, type FormSchema } from "./schema";
    import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    let { data } = $props()
    const form = superForm(data.form, {
        validators: zodClient(formSchema)
    })

    const { form: formData, enhance } = form
</script>

<div class="flex h-screen justify-center items-center">
    <form method="POST" use:enhance>
      <Form.Field {form} name="word">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Word</Form.Label>
            <Input {...props} bind:value={$formData.word} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="sentence">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Sentence</Form.Label>
            <Input {...props} bind:value={$formData.sentence} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="context">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Context</Form.Label>
            <Input {...props} bind:value={$formData.context} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <div class="flex justify-end mt-3">
        <Form.Button>Submit</Form.Button>
      </div>
    </form>
</div>