<template>
  <el-tabs
    type="border-card"
    v-model="activeTab"
    @tab-click="listTabData"
    style="height: 100%">
    <el-tab-pane name='tracker'>
      <span slot="label"><i class="el-icon-connection"></i> Tracker</span>
      <Tracker
        :trackerTableData="trackerTableData"
        :trackerTableLoading="trackerTableLoading"
        :listTracker="listTracker"/>
    </el-tab-pane>
    <el-tab-pane name='project'>
      <span slot="label"><i class="el-icon-menu"></i> Project</span>
      <Project
        :projectTableData="projectTableData"
        :projectTableLoading="projectTableLoading"
        :listProject="listProject"/>
    </el-tab-pane>
    <el-tab-pane name='sprint'>
      <span slot="label"><i class="el-icon-s-grid"></i> Sprint</span>
      <Sprint
        :sprintTableData="sprintTableData"
        :sprintTableLoading="sprintTableLoading"
        :listSprint="listSprint"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Tracker from '@/components/Tracker.vue'
import Project from '@/components/Project.vue'
import Sprint from '@/components/Sprint.vue'
import trackerSvc from '@/services/trackerSvc'
import projectSvc from '@/services/projectSvc'
import sprintSvc from '@/services/sprintSvc'
export default {
  data () {
    return {
      trackerTableData: [],
      trackerTableLoading: false,
      projectTableData: [],
      projectTableLoading: false,
      sprintTableData: [],
      sprintTableLoading: false,
      activeTab: 'tracker'
    }
  },
  components: {
    Tracker,
    Project,
    Sprint
  },
  methods: {
    listTracker () {
      this.trackerTableLoading = true
      trackerSvc.listTracker()
        .then((response) => {
          console.log(response)
          this.trackerTableData = response.data.detail.results
          console.log(this.trackerTableData)
        })
        .catch((error) => {
          console.log(error)
          this.trackerTableData = []
        })
        .finally(() => {
          this.trackerTableLoading = false
        })
    },
    listProject () {
      this.projectTableLoading = true
      projectSvc.listProject()
        .then((response) => {
          console.log(response)
          this.projectTableData = response.data.detail.results
        })
        .catch((error) => {
          console.log(error)
          this.projectTableData = []
        })
        .finally(() => {
          this.projectTableLoading = false
        })
    },
    listSprint () {
      this.sprintTableLoading = true
      sprintSvc.listSprint()
        .then((response) => {
          console.log(response)
          this.sprintTableData = response.data.detail.results
        })
        .catch((error) => {
          console.log(error)
          this.sprintTableData = []
        })
        .finally(() => {
          this.sprintTableLoading = false
        })
    },
    listTabData (tab, event) {
      console.log(tab.name + event)
      if (tab.name === 'tracker') {
        this.listTracker()
      } else if (tab.name === 'project') {
        this.listProject()
      } else if (tab.name === 'sprint') {
        this.listSprint()
      }
    }
  },
  mounted: function () {
    this.listTracker()
  }
}
</script>
