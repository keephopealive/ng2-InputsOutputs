import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, Injectable, Input, Output, EventEmitter, ViewChild, OnInit} from '@angular/core';


@Component({
  selector: 'child',
  template: `
  <h4>Child Component</h4>
  <p>Number from parent is: {{someID}} </p>
  <button (click)="callParent($event)">Click me to change my parent (from child)</button>
  `
})
export class ChildComponent {
  @Input() someID: number;
  @Output() anEvent = new EventEmitter()
  
  callParent(event){
      this.anEvent.emit(event);
  }
  
}

@Component({
  selector: 'parent',
  directives: [ChildComponent],
  template: `
  <h3>Parent Component</h3>
  <child 
    [someID]="7"
    (anEvent)="eventCalled($event)"
  ></child>
  <button (click)="sampleChildCall($event)">Click me to change the child (from parent)</button>
  `
})
export class ParentComponent {
  
  eventCalled(event){
    console.log("Parent")
    console.log(event);
  }
  
  @ViewChild (ChildComponent) childComponent: ChildComponent;
  sampleChildCall(event){ 
		this.childComponent.callParent(event); 
	}
  
}


@Component({
  selector: 'my-app',
  directives: [ParentComponent],
  template: `
  <parent></parent>
  `
})
export class MyAppComponent {

}

bootstrap(MyAppComponent, []);

// // =======================================
// // export interface TaskModel {
// //     title: string;
// //     completed: boolean;
// //     date: Date;
// // }

// export class TaskModel {
//   constructor(
//     public title: string = "",
//     public completed: boolean = false,
//     public date: Date = new Date() ){}
// }

// export class NoteModel {
//   constructor(
//     public id: number = 6,
//     public title: string = "New Note",
//     public content: string = "",
//     public date: Date = new Date() ){}
// }
// // =======================================
// @Injectable()
// export class NoteService {
//   notes: Array<NoteModel> = [
//     new NoteModel(1, "First", "First Note!"),
//     new NoteModel(2, "Second", "Second Note!"),
//     new NoteModel(3, "Third", "Third Note!"),
//     new NoteModel(4, "Fourth", "Fourth Note!"),
//     new NoteModel(5, "Fifth", "Fifth Note!"),
//   ];
  
//   insertTask(note: NoteModel){
//     this.notes = [
//       ...this.notes, note
//     ]
//   }
  
//   getNotes(): Array<NoteModel>{
//     // return this._http.get(notesUrl)
//     // .map(notes => notes.find(note => note.id == id))
//     return this.notes;
//   }
  
//   getNote(id: number): NoteModel{
//     for(var i = 0; i < this.notes.length; i++ ){
//       if (this.notes[i].id == id){
//         return this.notes[i];
//       }
//     }
//   }
// }

// // =======================================
// @Injectable()
// export class TaskService {
//   tasks: Array<TaskModel> = [
//     new TaskModel("Think"),
//     new TaskModel("Plan"),
//     new TaskModel("Act"),
//     new TaskModel("Revise"),
//     new TaskModel("Repeat")
//   ];
//   completeTask(task: TaskModel): void{
//     const i = this.tasks.indexOf(task);
//     this.tasks[i].completed = true;
//   }
  
//   insertTask(task: TaskModel){
//     this.tasks = [
//       ...this.tasks, task
//     ]
//   }
// }

// // =======================================
// @Component({
//   selector: 'task-new',
//   template: `
//     <div class="row">
//       <h3>New Task</h3>
//       <form (submit)="onSubmit()">
//         <input [(ngModel)]="task.title">
//         <input [(ngModel)]="task.description">
//         <input type="submit">
//       </form>
//     </div>
//   `
// })
// export class TaskNewComponent implements OnInit {
//   task: TaskModel;
  
//   constructor(public taskService: TaskService){
//     this.task = new TaskModel();
//   }
  
//   ngOnInit(){
//     this.task = new TaskModel();
//   }
  
//   onSubmit(){
//     this.taskService.insertTask(this.task);
//     this.task = new TaskModel();
//   }

  
// }

// // =======================================
// @Component({
//   selector: 'task-details',
//   directives: [ROUTER_DIRECTIVES],
//   template: `
//     <div class="row">
//       <h4>Task Title: {{task?.title}}</h4>
//       <h4>Task Date: {{task?.date}}</h4>
//       <button 
//         (click)="completed(task)
//       ">Complete Task: {{task.title}}</button>
//     </div>
//   `
// })
// export class TaskDetailsComponent {
//   @Input() task: TaskModel; // <-- Expects to recieve a task of type Task Model
  
//   constructor(
//     public taskService: TaskService ){}

//   completed(task){
//     this.taskService.completeTask(task);
//   }
  
//   envokedByParent(){
//     console.log("Function in child is envoked by parent");
//   }
// }

// // =======================================
// @Component({
//   selector: 'task-list',
//   directives: [TaskDetailsComponent],
//   template: `
//     <div class="row">
//       <h3>Tasks List</h3>
      
//       <ul>
//         <li *ngFor="#task of taskService.tasks" >
//           <div (click)="selectTask(task)">   
//             <span>{{ task.title }}</span>
//             <span>{{ task.completed }}</span>
//           </div>
//         </li>
//       </ul>
      
//       <task-details 
//         *ngIf="selectedTask" 
//         [task]="selectedTask" 
//       ></task-details>      
//     </div>
//   `
// })
// export class TaskListComponent {
//   selectedTask: TaskModel;

//   constructor(
//     public taskService: TaskService ){}
  
//   selectTask(task){
//     this.selectedTask = task;
//   }
    
// }


// // ======================================= 
// @Component({
//   selector: 'note-details',
//   directives: [ROUTER_DIRECTIVES ],
//   template: `
//     <div class="row">
//       <div>
//         <h4>Note Title: {{ note.title }}</h4>
//         <h4>Note Content: {{ note.content }}</h4>
//       </div>
//       <a href="" [routerLink]="['Notes']">Back to Tasks</a>
//     </div>
//   `
// })
// export class NoteDetailsComponent implements OnInit {
//   @Input() note: NoteModel;
  
//   constructor(
//     private _routeParams: RouteParams,
//     private _router: Router,
//     private _noteService: NoteService){}
  
//   ngOnInit() {
//     if (!this.note) {
//       let id = +this._routeParams.get('id');
//       this._setEditNote(this._noteService.getNote(id));
//     }
//   }

//   private _gotoNotes() {
//     let route = ['Notes', { id: this.note ? this.note.id : null }]
//     this._router.navigate(route);
//   }

//   private _setEditNote(vehicle: NoteModel) {
//     if (vehicle) {
//       this.note = vehicle;
//     } else {
//       this._gotoNotes();
//     }
//   }  
// }

// // =======================================
// @Component({
//   selector: 'notes-list',
//   directives: [ROUTER_DIRECTIVES, NoteDetailsComponent],
//   template:`
//     <div class="row">
//       <h3>Notes List</h3>
//       <ul>
//         <li *ngFor="#note of noteService.notes">
//           <a href="" [routerLink]="['Note', {id: note.id}]">
//             {{note.id}}. {{note.title}}
//           </a>
//         </li>
//       </ul>
//       <note-details *ngIf="selectedNote" [note]="selectedNote"></note-details>
//     </div>
//   `
// })
// export class NotesListComponent implements OnInit {
//   notes: Array<NoteModel>;
//   note: NoteModel;
//   selectedNote: NoteModel;
  
//   constructor(
//     private _routeParams: RouteParams,
//     private _noteService: NoteService,
//     public noteService: NoteService){}
  
//  selectNote(note){
//    this.selectedNote = note;
//  }
 
//   ngOnInit(){
//     if(!this.note){
//       let id = +this._routeParams.get('id');
//       this.note = this._noteService.getNote(id);
//     }
//   }
 
// }


// @Component({
//   selector: 'notes',
//   directives: [ROUTER_DIRECTIVES],
//   providers: [],
//   template: `
//     <router-outlet></router-outlet>
//   `
// })
// @RouteConfig([
//   { path: '/', name: 'Notes', component: NotesListComponent, useAsDefault: true},
//   { path: '/:id', name: 'Note', component: NoteDetailsComponent }
// ])
// export class NotesComponent { }

// // =======================================
// // ROUTER_DIRECTIVES = routerLink
// @Component({
//     selector: 'my-app',
//     directives: [ROUTER_DIRECTIVES, TaskListComponent],
//     providers: [ROUTER_PROVIDERS, TaskService, NoteService],
//     template: `
//         <div class="container">
//           <h1>Tasks & Notes</h1>
//           <nav>
//             <a href="" [routerLink]="['Tasks']">Tasks</a> | 
//             <a href="" [routerLink]="['Notes']">Notes</a>
//           </nav>
//           <router-outlet></router-outlet>
//         </div>
//     `
// })
// @RouteConfig([
// 	{path: '/tasks', name: 'Tasks', component: TaskListComponent, useAsDefault: true},
//   {path: '/notes/...', name: 'Notes', component: NotesComponent},
// ])
// export class AppComponent { }

// bootstrap(AppComponent, []);