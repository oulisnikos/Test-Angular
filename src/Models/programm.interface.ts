export interface Maths{
    start_time: string;
    end_time: string;
    math1: string;
    math2: string;
    math3: string;
    math4: string;
    math5: string;
}

export interface DataAction {
  maths: Maths;
  action: string;
}
