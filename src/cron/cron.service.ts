/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { Agenda } from 'agenda/es'
import { EventEmitter } from 'events'
import { AppointmentService } from 'src/appointment/appointment.service'
@Injectable()
export default class CronService {
  public agenda: Agenda | undefined
  constructor(
    // @Inject(forwardRef(() => AgendaJobService))
    private appointmentService : AppointmentService
  ) {
    this.init()
  }

  async init() {
    try {
        this.agenda = new Agenda({ db:  'mongodb://127.0.0.1/appointment' })
        this.define()
        console.log('CronService init success')
        this.start().then((r) => console.log('CronService start success'))

    } catch (e) {
      console.error(e)
    }
  }

  async now(name: string, data: any = null) {
    return await this.agenda.now(name, data)
  }

  define() {
    /** CORE JOB */
    // this.agenda?.define(
    //   'removeAgendaJobFailOrComplete',
    //   {
    //     priority: JobPriority.highest,
    //     concurrency: 1,
    //   },
    //   async (job: any) => {
    //     try {
    //       await this.agendaJobService.cleanFailedOrCompleteJob()
    //     } catch (e) {
    //       this.logger.log(`cleanFailedOrCompleteJob ${e}`)
    //     }
    //   },
    // )
    this.agenda?.define('consolelog', async (job, done)=>{
        console.log('Agenda successfully worked')
        done();
    });
    this.agenda?.define('notifyForSchedule', async (job, done)=>{
        await this.appointmentService.nofityShedule()
        done();

    });
    /** CORE JOB */
  }

//   async registerJobWithTimeFromMongoDB(repeatInterval: string, jobName: string, jobs: any[]) {
//     const indexOfJobInDatabase = jobs.findIndex((e: any) => e?.name === jobName)
//     if (indexOfJobInDatabase > -1) {
//       await this.agenda?.every(jobs[indexOfJobInDatabase]?.repeatInterval, jobName)
//     } else {
//       await this.agenda?.every(repeatInterval, jobName)
//     }
// }

  async start() {
    await this.agenda?.start()
    await this.agenda?.schedule('in 20 minutes', 'consolelog');
    await this.agenda?.schedule('in 60 minutes', 'consolelog');

    // Alternatively, you could also do:
    // await this.registerJobWithTimeFromMongoDB("*/3 * * * *", "delete old user")
    /** CORE JOB */
  }
}


// agenda.define(
// 	'send email report',
// 	async job => {
// 		const { to } = job.attrs.data;
// 		await emailClient.send({
// 			to,
// 			from: 'example@example.com',
// 			subject: 'Email Report',
// 			body: '...'
// 		});
// 	},
// 	{ priority: 'high', concurrency: 10 }
// );

// (async function () {
// 	await agenda.start();
// 	await agenda.schedule('in 20 minutes', 'send email report', { to: 'admin@example.com' });
// })();