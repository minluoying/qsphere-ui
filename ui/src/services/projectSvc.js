import axios from 'axios'

export default {

  listProject () {
    return axios.get('/api/projects')
  },

  addProject (projectData) {
    var _data = {
      // {
      //   "case_tracker": {
      //     "project_key": "QS",
      //     "project_value": "QSphere",
      //     "tracker_id": "e095081f-b145-4df7-affa-0412fce2ea88"
      //   },
      //   "issue_tracker": {
      //     "project_key": "QS",
      //     "project_value": "QSphere",
      //     "tracker_id": "e095081f-b145-4df7-affa-0412fce2ea88"
      //   },
      //   "name": "MyProject"
      // }
      name: projectData.name,
      case_tracker: {
        project_key: projectData.project.case.key,
        project_value: projectData.project.case.value,
        tracker_id: projectData.tracker.case.id
      },
      issue_tracker: {
        project_key: projectData.project.issue.key,
        project_value: projectData.project.issue.value,
        tracker_id: projectData.tracker.issue.id
      }

      // name: projectData.name,
      // tracker: {
      //   issue: {
      //     id: projectData.tracker.issue.id,
      //     name: projectData.tracker.issue.name
      //   },
      //   case: {
      //     id: projectData.tracker.case.id,
      //     name: projectData.tracker.case.name
      //   }
      // },
      // project: {
      //   issue: {
      //     key: projectData.project.issue.key
      //   },
      //   case: {
      //     key: projectData.project.case.key
      //   }
      // }
    }
    return axios.post('/api/projects', _data)
  },

  updateProject (projectData) {
    var _data = {
      name: projectData.name,
      tracker: {
        issue: {
          id: projectData.tracker.issue.id
        },
        case: {
          id: projectData.tracker.case.id
        }
      },
      project: {
        issue: {
          key: projectData.project.issue.key,
          value: projectData.project.issue.value
        },
        case: {
          key: projectData.project.case.key,
          value: projectData.project.case.value
        }
      }
    }
    return axios.put('/api/project/' + projectData.id, _data)
  },

  getProject (projectId) {
    return axios.get('/api/project/' + projectId)
  },

  deleteProject (projectId) {
    return axios.delete('/api/project/' + projectId)
  },

  activeProject (projectId, projectStatus) {
    if (projectStatus === 'active') {
      return axios.put('/api/project/' + projectId + '/active')
    } else {
      return axios.put('/api/project/' + projectId + '/disable')
    }
  }
}
