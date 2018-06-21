<?php 
/**
 * In Laravel
 * 
 * This is sample code to show how you should handle the submission of the form and form definition
 * in order to automate generation of the database table that would hold the data submitted to 
 * the form.
 * 
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class YourFormController extends Controller
{
    // This function is to save the form and form definition to a forms table then use the definition to create a data table for the form.
    public function SaveForm()
    {
        if (isset($_POST['data'])) {
            $formData = json_decode($_POST['data']);
            $definition = json_encode($formData->definition);

            $id = DB::table('forms')->insertGetID(
                [
                    'form_name' => $formData->name,
                    'form_html' => $formData->html,
                    'form_definition' => $definition,
                    'active_yn' => 1,
                    'created_at' => (new \DateTime)->format('Y-m-d H:i:s')
                ]
            );
            
            Schema::create('form' . $id, function($table) {
                $table->increments('id');
            });
            
            $passedVal = true;
            foreach($formData->definition as $ElType => $Els) 
            {
                foreach($Els as $ElNumber => $ElData) 
                {
                    $break = 'here';
                    switch ($ElData->type) {
                        case 'string':
                            if ($ElType == 'radiobutton' && Schema::hasColumn('form' . $id, $ElData->name)) {
                                break;
                            } else {
                                Schema::table('form' . $id, function($table) use ($ElData)
                                {
                                    $table->string($ElData->name, $ElData->size)->nullable();
                                });
                            }
                            break;
                        case 'unsignedTinyInteger':
                            Schema::table('form' . $id, function($table) use ($ElData)
                            {
                                $table->tinyInteger($ElData->name)->unsigned()->default(0);
                            });
                            break;
                        case 'date':
                            Schema::table('form' . $id, function($table) use ($ElData)
                            {
                                $table->date($ElData->name)->nullable();
                            });
                            break;
                        case 'time':
                            Schema::table('form' . $id, function($table) use ($ElData)
                            {
                                $table->time($ElData->name)->nullable();
                            });
                            break;
                        case 'data':
                            Schema::table('form' . $id, function($table) use ($ElData)
                            {
                                $table->binary($ElData->name)->nullable();
                            });
                            DB::statement("ALTER TABLE `form" . $id . "` CHANGE COLUMN `" . $ElData->name . "` `" . $ElData->name . "` LONGBLOB NULL;");
                            break;
                    }
                    if (!Schema::hasColumn('form' . $id, $ElData->name)) {
                        $passedVal = false;
                    }
                }
            }
            if ($passedVal === true) {
                return response()->json(['return' => 'success']);
            }
        }
        return response()->json(['return' => 'error']);
    }

    // This function will process the submission of data through a form that was saved using the above example. 
    public function ProcessSubmission() {
        if (isset($_POST['formID'])) {
            $formID = $_POST['formID'];
            $formDef = DB::table('forms')->select('form_definition')->where('id', $formID)->get()->first();
            $formDef = json_decode($formDef->form_definition);
            $break = 'here';
            foreach ($formDef as $ElType => $Els)
            {
                foreach ($Els as $ElNum => $ElData)
                {
                    switch($ElData->type) {
                        case 'string':{
                            if (array_key_exists($ElData->name, $_POST)) {
                                if (!isset($id)) {
                                    $id = DB::table('form' . $formID)->insertGetId(
                                        [$ElData->name => $_POST[$ElData->name]]
                                    );
                                } else {
                                    DB::table('form' . $formID)->where('id', $id)->update([$ElData->name => $_POST[$ElData->name]]);
                                }
                            }
                            break;
                        }
                        case 'unsignedTinyInteger': {
                            if (array_key_exists($ElData->name, $_POST)) {
                                if (!isset($id)) {
                                    $id = DB::table('form' . $formID)->insertGetId(
                                        [$ElData->name => 1]
                                    );
                                } else {
                                    DB::table('form' . $formID)->where('id', $id)->update([$ElData->name => 1]);
                                }
                            }
                            break;
                        }
                        case 'date': {
                            if (array_key_exists($ElData->name, $_POST)) {
                                $date = (new \DateTime($_POST[$ElData->name]))->format('Y-m-d');
                                if (!isset($id)) {
                                    $id = DB::table('form' . $formID)->insertGetId(
                                        [$ElData->name => $date]
                                    );
                                } else {
                                    DB::table('form' . $formID)->where('id', $id)->update([$ElData->name => $date]);
                                }
                            }
                            break;
                        }
                        case 'time': {
                            if (array_key_exists($ElData->name, $_POST)) {
                                $time = (new \DateTime($_POST[$ElData->name]))->format('H:i:s');
                                if (!isset($id)) {
                                    $id = DB::table('form' . $formID)->insertGetId(
                                        [$ElData->name => $time]
                                    );
                                } else {
                                    DB::table('form' . $formID)->where('id', $id)->update([$ElData->name => $time]);
                                }
                            }
                            break;
                        }
                        case 'data': {
                            if (array_key_exists($ElData->name, $_FILES)) {

                                $type = pathinfo($_FILES[$ElData->name]['tmp_name'], PATHINFO_EXTENSION);
                                $data = file_get_contents($_FILES[$ElData->name]['tmp_name']);
                                $base64 = 'data:' . $type . 'name:' . $_FILES[$ElData->name]['name'] . ';base64,' . base64_encode($data);

                                if (!isset($id)) {
                                    $id = DB::table('form' . $formID)->insertGetId(
                                        [$ElData->name => $base64]
                                    );
                                } else {
                                    DB::table('form' . $formID)->where('id', $id)->update([$ElData->name => $base64]);
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
}