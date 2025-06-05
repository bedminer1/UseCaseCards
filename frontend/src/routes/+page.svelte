<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    
    import { formSchema } from "./schema";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    let { data } = $props()
    let { cards } = data
    const form = superForm(data.form, {
        validators: zodClient(formSchema),

        onResult: ({ result }) => {
          if (result.type === "success") {
            openDialog = false
          }
        }
    })

    let openDialog = $state(false)

    const { form: formData, enhance } = form
</script>

<div class="flex h-screen justify-center items-center">
  <Dialog.Root bind:open={openDialog}>
    <Dialog.Trigger>New</Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>New Card</Dialog.Title>
        <Dialog.Description>
          Add a card
        </Dialog.Description>
      </Dialog.Header>

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
        <Form.Field {form} name="languages">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Languages</Form.Label>
              <Input {...props} bind:value={$formData.languages} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <div class="flex justify-end mt-8">
          <Form.Button>Submit</Form.Button>
        </div>
      </form>
    </Dialog.Content>
  </Dialog.Root>

  {#each cards as card}
  <p>{JSON.stringify(card)}</p>
  {/each}
</div>