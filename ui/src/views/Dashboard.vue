<template>
  <div style="width: 100%; height: 100%;">
    <el-row type="flex" style="height: 5%;">
    <el-form
      :inline="true"
      size="small"
      label-position="left">
      <!-- <el-form-item
        label="Tracker">
        <el-select
          @focus="listTracker"
          v-model="tracker.id"
          placeholder="Select Tracker">
          <el-option
            v-for="item in trackers"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item
        v-if="$route.path === '/project'"
        label="Project"
        style="margin-left: 20px;">
        <el-select
          @focus="listProject"
          v-model="project.name"
          @change="updateUrlForProject"
          placeholder="Select Project">
          <el-option
            v-for="item in projects"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="$route.path === '/sprint'"
        label="Sprint"
        style="margin-left: 20px;">
        <el-select
          @focus="listSprint"
          v-model="sprint.name"
          @change="updateUrlForSprint"
          placeholder="Select Sprint">
          <el-option
            v-for="item in sprints"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="$route.path === '/sprint'"
        label="Requirement"
        style="margin-left: 20px;">
        <el-select
          @focus="listRequirements"
          v-model="req"
          @change="updateUrlForSprint"
          placeholder="Select Requirement">
          <el-option
            v-for="item in reqs"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="margin-left: 20px;">
        <el-tooltip
          class="item"
          effect="dark"
          content="Full Screen"
          placement="right">
          <el-link
            icon="el-icon-full-screen"
            :underline="false"
            style="font-size: 1.25em;"
            hover="adadedeik"
            @click="fullScreen">
          </el-link>
        </el-tooltip>
      </el-form-item>
    </el-form>
    </el-row>
    <iframe
      frameborder="0"
      sandbox="allow-scripts allow-same-origin"
      :src="url"
      style="width: 100%; height: 95%;">
    </iframe>
  </div>
</template>

<script>
import trackerSvc from '@/services/trackerSvc'
import projectSvc from '@/services/projectSvc'
import sprintSvc from '@/services/sprintSvc'
export default {
  data () {
    return {
      overviewBaseUrl: '/board/d/qsphere-overview/qsphere-overview?orgId=1&kiosk&refresh=1m',
      overviewInitUrl: '/board/d/qsphere-overview/qsphere-overview?orgId=1&theme=light&kiosk&refresh=1m',
      projectBaseUrl: '/board/d/qsphere-project/qsphere-project?orgId=1&kiosk&refresh=1m',
      projectInitUrl: '/board/d/qsphere-project/qsphere-project?orgId=1&theme=light&kiosk&refresh=1m',
      sprintBaseUrl: '/board/d/qsphere-sprint/qsphere-sprint?orgId=1&kiosk&refresh=1m',
      sprintInitUrl: '/board/d/qsphere-sprint/qsphere-sprint?orgId=1&theme=light&kiosk&refresh=1m',
      url: '/board/d/qsphere-overview/qsphere-overview?orgId=1&theme=light&kiosk&refresh=1m',
      theme: 'light',
      trackers: [],
      tracker: {
        id: '',
        name: ''
      },
      projects: [],
      project: {
        id: '',
        name: ''
      },
      sprints: [],
      sprint: {
        id: '',
        name: ''
      },
      reqs: [],
      req: '',
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    updateUrlForOverview () {
      this.sprint.id = ''
      this.sprint.name = ''
      this.project.id = ''
      this.project.name = ''
      this.url = this.overviewBaseUrl + '&from=' + this.startDate + '&to=now'
      console.log('Change URL to ' + this.url)
    },
    updateUrlForProject () {
      this.sprint.id = ''
      this.sprint.name = ''
      this.url = this.projectBaseUrl + '&theme=' + this.theme + '&var-project=' + this.project.id + '&from=' + this.startDate + '&to=now'
      console.log('Change URL to ' + this.url)
    },
    updateUrlForSprint () {
      for (var s in this.sprints) {
        console.log(this.sprints[s])
        if (this.sprints[s].name === this.sprint.name) {
          this.sprint.id = this.sprints[s].id
          break
        }
      }
      console.log(this.sprint.id)
      sprintSvc.getSprint(this.sprint.id)
        .then((response) => {
          console.log(response)
          this.startDate = response.data.detail.start_time
          this.endDate = response.data.detail.end_time
          this.url = this.sprintBaseUrl + '&theme=' + this.theme + '&var-project=' + response.data.detail.project_id + '&var-sprint=' + this.sprint.id + '&var-requirement=' + this.req + '&from=' + this.startDate * 1000 + '&to=' + this.endDate * 1000
          console.log('Change URL to ' + this.url)
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },
    listTracker () {
      trackerSvc.listTracker()
        .then((response) => {
          console.log(response)
          this.trackers = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listProject () {
      projectSvc.listProject()
        .then((response) => {
          console.log(response)
          this.projects = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listSprint () {
      sprintSvc.listSprint()
        .then((response) => {
          console.log(response)
          this.sprints = response.data.detail.results
        })
        .catch((error) => {
          this.$message.error(String(error))
        })
    },
    listRequirements () {
      if (this.sprint.id) {
        sprintSvc.getSprint(this.sprint.id)
          .then((response) => {
            console.log(response)
            this.reqs = response.data.detail.requirements
          })
          .catch((error) => {
            this.$message.error(String(error))
          })
      } else {
        this.reqs = []
      }
    },
    fullScreen () {
      var fullScreenUrl = this.url
      window.open(fullScreenUrl.replace(/theme=light/, 'theme=dark'))
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/overview') {
        this.url = this.overviewInitUrl
        console.log('Change URL to ' + this.url)
      }
      if (to.path === '/project') {
        this.url = this.projectInitUrl
        console.log('Change URL to ' + this.url)
      };
      if (to.path === '/sprint') {
        this.url = this.sprintInitUrl
        console.log('Change URL to ' + this.url)
      }
    }
  }
}
</script>
