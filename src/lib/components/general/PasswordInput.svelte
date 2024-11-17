<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Eye, EyeOff } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import type { ClassNameValue } from 'tailwind-merge';

  interface Props {
    placeholder?: string;
    value: string;
    class?: ClassNameValue;
  }

  let { value = $bindable(), class: className, ...props }: Props = $props();

  let showPassword = $state(false);
</script>

<div class="relative flex items-center">
  <Input
    type={showPassword ? 'text' : 'password'}
    {...props}
    class={cn('pr-10', className)}
    placeholder="Enter your password"
    bind:value
  />
  <button type="button" class="absolute right-3" onclick={() => (showPassword = !showPassword)}>
    {#if showPassword}
      <EyeOff class="h-[15px] w-[15px]" />
    {:else}
      <Eye class="h-[15px] w-[15px]" />
    {/if}
  </button>
</div>
