<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { addProfSchema, type AddProfSchema } from '../admin-departments-schema';
  import { CircleHelp, Loader, X } from 'lucide-svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import { fromDepartmentsRouteState } from '../../_states/fromAdminDepartments.svelte';
  import type { Departments, ResultModel } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { fromDepRouteState } from '../_states/fromDepRoutes.svelte';
  import * as Popover from '$lib/components/ui/popover';
  import * as Select from '$lib/components/ui/select/index.js';
  import { departments } from '../_states/fromDepRoutes.svelte';

  interface Props {
    addProfForm: SuperValidated<Infer<AddProfSchema>>;
  }

  const { addProfForm }: Props = $props();

  const departmentRoute = fromDepartmentsRouteState();
  const depRoute = fromDepRouteState();

  let open = $state(false);

  const form = superForm(addProfForm, {
    validators: zodClient(addProfSchema),
    id: crypto.randomUUID(),
    invalidateAll: false,
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string; data: Departments }>;

      switch (status) {
        case 200:
          toast.success('Create Professor', { description: data.msg });
          departmentRoute.setProfs(data.data);
          open = false;
          break;
        case 401:
          toast.error('Create Professor', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const selectedDepartment = $derived(
    $formData.department ? { label: $formData.department, value: $formData.department } : undefined
  );
</script>

<Button onclick={() => (open = true)} class="max-w-fit">Add Professor</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <button
      onclick={() => (open = false)}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header>
      <AlertDialog.Title>Add Professor</AlertDialog.Title>
      <AlertDialog.Description>
        You are about to add a professor in <strong>{depRoute.getRoute()}</strong> department.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/addProfEvent" use:enhance class="flex flex-col gap-[10px]">
      <Form.Field {form} name="department">
        <Form.Control let:attrs>
          <Form.Label>Department</Form.Label>
          <Select.Root
            selected={selectedDepartment}
            onSelectedChange={(v) => {
              v && ($formData.department = v.value);
            }}
          >
            <Select.Trigger {...attrs}>
              <Select.Value placeholder="Select department" />
            </Select.Trigger>
            <Select.Content>
              {#each departments as department}
                <Select.Item value={department} label={department} />
              {/each}
            </Select.Content>
          </Select.Root>
          <input hidden bind:value={$formData.department} name={attrs.name} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="profName">
        <Form.Control let:attrs>
          <Form.Label>Professor Name</Form.Label>
          <Input
            {...attrs}
            bind:value={$formData.profName}
            placeholder="Enter the professor name"
          />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="sections">
        <Form.Control let:attrs>
          <Form.Label>Sections</Form.Label>
          <Textarea
            {...attrs}
            bind:value={$formData.sections}
            placeholder="Enter the professor sections"
          />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="subjects">
        <Form.Control let:attrs>
          <Form.Label>Subjects</Form.Label>
          <Textarea
            {...attrs}
            bind:value={$formData.subjects}
            placeholder="Enter the professor subjects"
          />
        </Form.Control>

        <Form.FieldErrors />
      </Form.Field>

      <Popover.Root>
        <Popover.Trigger class="max-w-fit">
          <Button size="sm" variant="outline" class="flex items-center gap-[0.321rem]">
            <span>View Format Guide</span>
            <CircleHelp class="h-[15px] w-[15px]" />
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <p class="text-sm leading-7">
            Please use formats like <strong>BSIT-1,BSIT-2,BSCS-1,BSCS-2,BSCS-3</strong>.
          </p>

          <p class="text-sm leading-7">Example:</p>
          <p class="text-sm leading-7">Single section: <strong>BSIT-1</strong></p>
          <p class="text-sm leading-7">
            Multiple section: <strong>BSIT-1,BSIT-2,BSCS-1,BSCS-2,BSCS-3</strong>.
          </p>
        </Popover.Content>
      </Popover.Root>

      <div class="flex justify-end">
        <Form.Button disabled={$submitting} class="relative ">
          {#if $submitting}
            <div
              class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Add
        </Form.Button>
      </div>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
