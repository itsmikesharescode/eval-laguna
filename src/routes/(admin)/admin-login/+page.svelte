<script lang="ts">
  import iteLogo from '$lib/assets/ite-logo.svg';
  import landingBg from '$lib/assets/landing-bg.png?enhanced';

  import { Undo2 } from 'lucide-svelte';
  import AdminLogin from './_components/AdminLogin.svelte';

  const { data } = $props();
</script>

<div class="md:grid md:grid-cols-[60%,40%]">
  <div class="relative h-screen w-full">
    <!-- Background Image -->
    <enhanced:img
      src={landingBg}
      alt="bg_image"
      class="absolute inset-0 h-full w-full object-cover grayscale-[60%] filter"
    />
    <!-- Centered Content -->
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-[10px]">
      <div class="flex flex-col items-center gap-[20px] rounded-lg bg-[#ffffffc0] p-[20px]">
        <div class="flex flex-col items-center justify-center gap-[20px]">
          <img src={iteLogo} alt={iteLogo} class="h-[150px] w-[150px]" />
          <p class="text-center text-3xl">
            <strong>LC ITE</strong> Faculty Evaluation
          </p>
          <p class="text-center text-3xl text-muted-foreground">
            Log in as <strong class="text-primary">Admin</strong>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="overflow-auto md:max-h-screen">
    <div class="sticky top-0 p-[20px]">
      <a
        href="/"
        class="flex max-w-fit items-center gap-[5px] rounded-sm bg-secondary p-[10px] text-sm"
      >
        <Undo2 class="h-[15px] w-[15px]" />
        Back Home
      </a>
    </div>
    <div
      class="mx-auto flex w-full max-w-[450px] flex-col gap-[10px] overflow-auto p-[20px] pb-[50px]"
    >
      <AdminLogin adminLoginForm={data.adminLoginForm} />
    </div>
  </div>
</div>
