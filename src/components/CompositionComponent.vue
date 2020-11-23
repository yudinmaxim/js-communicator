<template>
  <div>
    <p>{{ title }}</p>
    <q-list>
      <q-item v-for="todo in todos" :key="todo.id">
        <q-btn @click="increment">{{ todo.id }} - {{ todo.content }}</q-btn>
      </q-item>
    </q-list>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed, ref, toRef, Ref,
} from '@vue/composition-api';
import { Todo, Meta } from './models';

function useClickCount() {
  const clickCount = ref(0);
  function increment() {
    clickCount.value += 1;
    return clickCount.value;
  }

  return { clickCount, increment };
}

function useDisplayTodo(todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length);
  return { todoCount };
}

export default defineComponent({
  name: 'CompositionComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    todos: {
      type: (Array as unknown) as PropType<Todo[]>,
      default: () => [],
    },
    meta: {
      type: (Object as unknown) as PropType<Meta>,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  setup(props) {
    return { ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')) };
  },
});
</script>
