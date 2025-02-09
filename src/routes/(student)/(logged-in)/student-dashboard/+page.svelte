<script lang="ts">
  import { BellRing, MoveUpRight } from 'lucide-svelte';
  import { fromStudentRouteState } from '../_states/fromStudentRoute.svelte';
  import { fromDashboardRouteState } from '../_states/fromDashboardRoute.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { ProfessorType } from '$lib/types';
  import { goto } from '$app/navigation';
  import * as Table from '$lib/components/ui/table';
  import Actions from './_components/Actions.svelte';
  import Subjects from '$lib/components/general/Subjects.svelte';
  import { Logs } from 'lucide-svelte';

  const route = fromStudentRouteState();
  const dashboardRoute = fromDashboardRouteState();

  route.setRoute('/student-dashboard');
  dashboardRoute.resetAnswer();
  dashboardRoute.setActiveProf(null);

  const handleEvaluate = (p: ProfessorType) => {
    dashboardRoute.setActiveProf(p);
    goto('/student-dashboard/evaluation');
  };
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
  <div class="bg-slate-100 p-[0.625rem] md:p-[1.25rem]">
    <div class="flex flex-wrap items-center gap-[20px] bg-primary p-[10px] md:flex-nowrap">
      <BellRing class="h-full w-[60px] p-[10px] text-white " />
      <div class="text-white">
        <p class="font-semibold leading-7">Reminder</p>
        <p class="text-sm leading-7">
          You are evaluating your SUBJECT TEACHER, please read the directions before you begin the
          evaluation process. If teachers where wrongly included in the please, please let us know.
          Message us at <a href="mailto:lcitedepartment@gmail.com" class="font-semibold underline"
            >lcitedepartment@gmail.com</a
          >
        </p>
      </div>
    </div>
  </div>

  <!--To be evaluated-->
  <div class="p-[0.625rem]">
    <div class="flex flex-col p-[10px]">
      <p class="text-xl font-semibold">Evaluation List</p>
      <p class="text-muted-foreground">Below are the list of faculty that needs your evaluation.</p>
    </div>

    <Table.Root>
      {#if !dashboardRoute.getProfs()?.length}
        <Table.Caption>There is no record.</Table.Caption>
      {/if}
      <Table.Header>
        <Table.Row>
          <Table.Head class="truncate">Teacher Name</Table.Head>
          <Table.Head class="truncate">Department Name</Table.Head>
          <Table.Head class="w-[200px]"></Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <!-- {#each Array(10) as _}
          <Table.Row>
            <Table.Cell class="truncate">Marriel B. Baet</Table.Cell>
            <Table.Cell class="truncate">Information Technology</Table.Cell>
            <Table.Cell class="truncate">
              <Button size="sm" class="flex items-center gap-[5px]">
                Evaluate Now
                <MoveUpRight class="h-[15px] w-[15px]" />
              </Button>
            </Table.Cell>
          </Table.Row>
        {/each} -->
        {#each dashboardRoute.getProfs() ?? [] as professor, index}
          <Table.Row>
            <Table.Cell class="truncate">{professor.fullname}</Table.Cell>
            <Table.Cell class="truncate">{professor.department}</Table.Cell>
            <Table.Cell class="truncate">
              <Button
                size="sm"
                onclick={() => handleEvaluate(professor)}
                class="flex items-center gap-[5px]"
              >
                Evaluate Now
                <MoveUpRight class="h-[15px] w-[15px]" />
              </Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

  <!--Evaluated area-->
  <div class="p-[0.625rem]">
    <div class="flex flex-col p-[10px]">
      <p class="text-xl font-semibold">Evaluation History</p>
      <p class="text-muted-foreground">Below are the record of evaluation.</p>
    </div>

    <Table.Root>
      {#if !dashboardRoute.getEvalds()?.length}
        <Table.Caption>There is no record.</Table.Caption>
      {/if}
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[3rem]"></Table.Head>
          <Table.Head class="truncate">Teacher Name</Table.Head>
          <Table.Head class="truncate">Department</Table.Head>
          <Table.Head class="truncate">Subjects</Table.Head>
          <Table.Head class="truncate">Result for you(%)</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <!-- {#each Array(10) as _}
          <Table.Row>
            <Table.Cell>
              <Logs />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">Marriel B. Baet</Table.Cell>
            <Table.Cell class="truncate">Information Technology</Table.Cell>
            <Table.Cell class="truncate">
              {#if professor.subjects.split(',').length > 1}
                <Subjects subjects={professor.subjects.split(',')} />
              {:else}
                <span>{professor.subjects}</span>
              {/if}
              ELECT 4
            </Table.Cell>
            <Table.Cell class="w-[7rem] truncate text-center">85%</Table.Cell>
          </Table.Row>
        {/each} -->

        {#each dashboardRoute.getEvalds() ?? [] as professor, index}
          <Table.Row>
            <Table.Cell>
              <Actions {professor} />
            </Table.Cell>
            <Table.Cell class="truncate font-medium">{professor.fullname}</Table.Cell>
            <Table.Cell class="truncate">{professor.department}</Table.Cell>
            <Table.Cell class="truncate">
              {#if professor.subjects.split(',').length > 1}
                <Subjects subjects={professor.subjects.split(',')} />
              {:else}
                <span>{professor.subjects}</span>
              {/if}
            </Table.Cell>
            <Table.Cell class="w-[7rem] truncate text-center">
              {(
                professor.answers_copy
                  .map((item) => item.percentage)
                  .reduce((acc, curr) => acc + curr) / professor.answers_copy.length
              ).toFixed(0)} %
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>
