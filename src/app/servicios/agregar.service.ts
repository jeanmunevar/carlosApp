import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo { 
  id?: string; 
  nombre: string;  
  fecha: string;
  apellido: string,
       cedula : string,
       celular : string,
       email : string,
       direccion : string,
       barrio : string,
       comuna : string,
       mesa : string,
       comentario:string,
}

@Injectable({
  providedIn: 'root'
})
export class AgregarService {

  private todosCollection: AngularFirestoreCollection<Todo>;
 
  private todos: Observable<Todo[]>;

  constructor(db: AngularFirestore) { 
    this.todosCollection = db.collection<Todo>('datos');
 
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getTodos() {
    return this.todos;
  }
 
  getTodo(id) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }
 
  updateTodo(todo: Todo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
 
  addTodo(todo: Todo) {
    return this.todosCollection.add(todo);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

}
