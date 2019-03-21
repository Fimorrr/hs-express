import mongoose, { Schema } from 'mongoose'
import { env } from '../../config'

/*
  Статусы:
0) Search показывать время
1) Waiting показывать время
2) Game
3) Dispute
4) Completed
5) Cancelled
6) Abandoned

  Опции:
0) Все отлично
1) Игра отменена, не удалось сыграть
2) Открыть спор, игрок кинул

*/

const gameSchema = new Schema({
  status: {
    type: Number,
    default: 0,
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  partner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  creatorSubmit: {
    type: Boolean,
    default: false
  },

  partnerSubmit: {
    type: Boolean,
    default: false
  },

  creatorOption: {
    type: Number,
    default: -1,
  },

  partnerOption: {
    type: Number,
    default: -1,
  },

  creatorPictures: [{
    type: String,
    default: null,
  }],

  partnerPictures: [{
    type: String,
    default: null,
  }],

  startedAt: {
    type: Date,
    default: Date.now,
  },

  changedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false
})

gameSchema.methods = {
  view () {
    let fields = ['status', 'creator', 'partner', 'creatorSubmit', 'partnerSubmit','startedAt', 'changedAt']

    const view = fields.reduce((view, field) => {
      view[field] = this[field]
      return view
    }, {})

    return view
  },

  async changeStatus (status) {
    this.status = status
    this.changedAt = Date.now();

    await this.save()

    return this
  },

  async addPartner (user) {
    this.partner = user.id

    await this.save()

    return this
  },

  async partnerConfirm () {
    this.partnerSubmit = true

    await this.save()

    return this
  },

  async creatorConfirm () {
    this.creatorSubmit = true

    await this.save()

    return this
  }
}

gameSchema.statics = {
  findGame () {
    return this.findOne({ status: 0 })
  },
}

const model = mongoose.model('Game', gameSchema)

export const schema = model.schema
export default model
