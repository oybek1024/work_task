<template>
  <div class="kanban">
    <h3>Task list kanban view</h3>
    <AddTask ref="createTaskModal" @created="createTask"/>
    <b-row>
      <b-col v-for="(col, colIndex) in cols" :key="col.name">
        <b-card :title="col.name" class="mb-2 cardMoving">
          <div
              class="dragArea"
              @dragenter="showArea"
              @dragleave="hideArea"
              @drop="onDrop($event, colIndex, 0)"
              @dragover="dragOver"
          />
          <transition-group
              name="list"
              tag="div"
          >
            <div v-for="(task, taskIndex) in col.tasks" :id="'task_' + task.id" :key="task.id">
              <b-card
                  class="task_card"
                  draggable="true"
                  @dragstart="dragStart($event, task.id, colIndex)"
                  @dragend="dragEnd"
                  :border-variant="borderColorByStatus(col.name)"
                  :header-bg-variant="borderColorByStatus(col.name)"
                  :header="task.title"
                  align="center"
                  header-text-variant="white"
              >
                <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                <b-button size="sm" class="deleteButton" variant="outline-danger" @click="deleteTask(colIndex, taskIndex)">
                  <b-icon icon="trash" aria-hidden="true"></b-icon>
                </b-button>
              </b-card>
              <div
                  class="dragArea"
                  @dragenter="showArea"
                  @dragleave="hideArea"
                  @dragover="dragOver"
                  @drop="onDrop($event, colIndex, taskIndex + 1)"
              />
            </div>
          </transition-group>
          <b-button v-if="col.name === 'Pending'" @click="$refs.createTaskModal.open()" variant="outline-primary" class="w-100" >Add New Task</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import AddTask from '@/components/AddTask.vue';
export default {
  components: {
    AddTask
  },
  data() {
    return {
      cols: [
        {
          name: 'Pending',
          tasks: [
            {id: "1", title: 'Task 1'},
          ]
        },
        {
          name: 'Accepted',
          tasks: [
            {id: "4", title: 'Task 4'},
            {id: "5", title: 'Task 5'},
            {id: "6", title: 'Task 6'},
          ]
        },
        {
          name: 'Finished',
          tasks: [
            {id: "7", title: 'Task 7'},
            {id: "8", title: 'Task 8'},
            {id: "9", title: 'Task 9'},
          ]
        },
        {
          name: 'Cancelled',
          tasks: [
            {id: "10", title: 'Task 10'},
            {id: "11", title: 'Task 11'},
            {id: "12", title: 'Task 12'},
          ]
        }
      ],
      draggedTaskId: null,
      draggedFromIndex: null
    }
  },
  methods: {
    createTask(title) {
      this.cols[0].tasks.push({ id: String(Math.floor(Math.random() * 1000)), title });
    },
    borderColorByStatus(status) {
      switch (status) {
        case 'Pending':
          return 'primary';
        case 'Accepted':
          return 'secondary';
        case 'Finished':
          return 'success';
        case 'Cancelled':
          return 'danger';
      }
    },
    deleteTask(colIndex, taskIndex) {
      this.cols[colIndex].tasks.splice(taskIndex, 1);
    },
    findTaskById(taskId) {
      for (let column of this.cols) {
        const task = column.tasks.find(i => i.id === taskId);
        if (task) return task;
      }
      return null;
    },
    dragStart(e, taskId, colIndex) {
      this.draggedTaskId = taskId;
      this.draggedFromIndex = colIndex;

      const draggedTask = document.getElementById('task_' + taskId);
      draggedTask.classList.add('dragging');

      e.dataTransfer.effectAllowed = 'move';
    },
    dragEnd(e) {
      const draggedTask = document.getElementById('task_' + this.draggedTaskId);
      if (draggedTask) {
        draggedTask.classList.remove('dragging');
      }
      this.draggedTaskId = null
      this.draggedFromIndex = null
    },
    dragOver(e) {
      e.preventDefault();
    },
    onDrop(e, colIndex, taskIndex) {
      console.log('drop', colIndex, this.cols);

      e.target.classList.remove('hovered');
      e.target.classList.remove('dragArea_active');

      const draggedTask = this.findTaskById(this.draggedTaskId);
      this.cols[this.draggedFromIndex].tasks = this.cols[this.draggedFromIndex].tasks.filter(task => task.id !== this.draggedTaskId);
      this.cols[colIndex].tasks.splice(taskIndex, 0, draggedTask);
    },
    showArea(e) {
      e.preventDefault();
      e.target.classList.add('dragArea_active');
    },
    hideArea(e) {
      e.preventDefault();
      e.target.classList.remove('dragArea_active');
    }
  }
}
</script>
<style>
.deleteButton {
  position: absolute;
  right: 0;
  bottom: 0;
}
.hide {
  display: none;

}
.task_card {
  cursor: pointer;
}

.dragArea {
  height: 25px;
  border: 1px dashed #9a9a9a;
  border-radius: 10px;
  opacity: 0;
  transition: all .3s ease-in;
}
.cardMoving {
  transition: all .3s ease-in;
}
.dragArea_active {
  opacity: 1;
  margin: 10px 0;
  border: 1px dashed #9a9a9a;
  border-radius: 10px;
  padding-top: 80px;
  transition: all .3s ease-in;
}

.dragArea.active::before {
  position: absolute;
  inset: .5rem;
  border-radius: .25rem;
}

.dragging {
  opacity: .6;
  transition: opacity 0.4s ease-in;
}

.list-move {
  transition: transform 0.5s ease;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>