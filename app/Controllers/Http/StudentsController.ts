import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { v4 as uuidv4 } from 'uuid'

import Student from 'App/Models/Student'

export default class StudentsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = request.body()

      const emailExists = await Student.findBy('email', body.email)

      if (emailExists) {
        response.status(400)

        return {
          message: 'Email already used!',
        }
      }

      const student = await Student.create({
        name: body.name,
        email: body.email,
        registration: uuidv4(),
        birth_date: body.birth_date,
      })

      response.status(201)

      return {
        message: 'User created successfully.',
        data: student,
      }
    } catch (error) {
      response.status(400)

      return {
        error: 'Unexpected error!',
      }
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const student = await Student.findBy('id', params.id)

      if (!student) {
        response.status(400)

        return {
          message: 'Student not found!',
        }
      }

      return {
        data: student,
      }
    } catch (error) {
      response.status(400)

      return {
        message: 'Unexpected error!',
      }
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.body()

      const student = await Student.findOrFail(params.id)

      if (body.name) {
        student.name = body.name
      }

      if (body.email) {
        const emailExists = await Student.findBy('email', body.email)

        if (emailExists) {
          response.status(400)

          return {
            message: 'Email already used!',
          }
        }

        student.email = body.email
      }

      if (body.birth_date) {
        student.birth_date = body.birth_date
      }

      await student.save()

      return {
        message: 'Student updated successfully',
        data: student,
      }
    } catch (error) {
      response.status(400)

      return {
        message: 'Unexpected error!',
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const student = await Student.findOrFail(params.id)

      await student.delete()

      return {
        message: 'Student deleted!',
        data: student,
      }
    } catch (error) {
      response.status(400)

      return {
        message: 'Unexpected error!',
      }
    }
  }
}
